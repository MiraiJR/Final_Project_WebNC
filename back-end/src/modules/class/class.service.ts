import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { Repository } from 'typeorm';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/class/CreateClass.dto';
import { UserService } from '../user/user.service';
import { ClassResponseDto } from './dto/class/ClassResponse.dto';
import { ClassUserService } from '../classUser/class-user.service';
import { UserRole } from 'src/shared/types/EnumUserRole';
import { ClassDetailResponseDto } from './dto/class/ClassDetailResponse.dto';
import { MailService } from '../mail/mail.service';
import { InviteToken } from 'src/shared/types/InviteToken';

@Injectable()
export class ClassService {
    constructor(
        private classRepository: ClassRepository,
        private userService : UserService,
        private classUserService: ClassUserService,
        private mailService: MailService,
        ) {}

    async create(createClassDto : CreateClassDto,creatorId:number): Promise<ClassDetailResponseDto>{
        const creator = await this.userService.findById(creatorId);
        if(!creator){
            throw new BadRequestException("User not exist")
        }
        const newClass = this.classRepository.create({...createClassDto,creator:creator});
        const savedClass = await  this.classRepository.save(newClass);
        const token:string = await this.classUserService.addMemberToClass(savedClass,creatorId,UserRole.AD);

        const classResponse: ClassDetailResponseDto = {
            title: savedClass.title,
            creatorId: savedClass.creator.id,
            idCode: savedClass.idCode,
            roleToken: token,
            description: savedClass.description,
            role: UserRole.AD,
        }

        return classResponse
    }

    async joinClassAsStudent(classIdCode: string, userId: number) : Promise<ClassDetailResponseDto>{
        const role: UserRole = await this.classUserService.findRole(classIdCode,userId);
        if(role ){
            return this.getDetailClass(classIdCode,userId);
        }
        

        const classroom: Class  = await this.findByIdCode(classIdCode);
        if(!classroom){
            throw new BadRequestException("Class code not exist")
        }

        const token: string = await this.classUserService.addMemberToClass(classroom,userId);

        const classResponse: ClassDetailResponseDto = {
            title: classroom.title,
            creatorId: classroom.creator.id,
            idCode: classroom.idCode,
            roleToken: token,
            description: classroom.description,
            role: UserRole.HS,
        }

        return classResponse
    }

    async findByIdCode(idCode: string): Promise<Class>{
        return this.classRepository.findClassByIdCode(idCode);
    }

    async getDetailClass(idCode: string, userid: number): Promise<ClassDetailResponseDto>{
        const classFound:Class = await this.findByIdCode(idCode);
        if(!classFound){
            throw new BadRequestException("Class code not exist");
        }
        const user = await this.userService.findById(userid);
        if(!user){
            throw new BadRequestException("User not exist");
        }

        const role = await this.classUserService.findRole(idCode,userid);
        const token = await this.classUserService.generateRoleToken(userid,idCode);

        const classResponse: ClassDetailResponseDto = {
            title: classFound.title,
            creatorId: classFound.creator.id,
            idCode: classFound.idCode,
            roleToken: token,
            description: classFound.description,
            role,
        };

        return classResponse;
    }

    async sendInviteEmail(emails: string[], idCode: string,role:UserRole){
        const classFound:Class = await this.findByIdCode(idCode);
        
        
        emails.forEach(async(email) => {
            const payload : InviteToken = {
                email,
                classID: idCode,
                role: role,
            }
            const token = await this.classUserService.signInviteToke(payload);
            await this.mailService.sendMailInvite(email,classFound,role,token);
        });
        
        
    }

    async handleAcceptLinkInvite (token: string,userId: number){
        if(token ==""){
            throw new BadRequestException("Token can not be empty")
        }
        try{
            const payload = await this.classUserService.verifyInviteToken(token,userId);
            const classInfo:Class = await this.findByIdCode(payload.classID);
            const classToken:string = await this.classUserService.addMemberToClass(classInfo,userId,payload.role);
            const classResponse: ClassDetailResponseDto = {
                title: classInfo.title,
                creatorId: classInfo.creator.id,
                idCode: classInfo.idCode,
                roleToken: classToken,
                description: classInfo.description,
                role: payload.role,
            }
            return classResponse;
        }catch(e){
            throw new BadRequestException(e.message);
        }
        
    }
}
