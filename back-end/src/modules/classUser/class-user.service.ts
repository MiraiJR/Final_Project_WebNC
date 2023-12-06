import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ClassUserRepository } from "./class-user.repository";
import { ClassService } from "../class/class.service";
import { UserService } from "src/modules/user/user.service";
import { Class } from "../class/class.entity";
import { ClassResponseDto } from "../class/dto/class/ClassResponse.dto";
import { UserRole } from "src/shared/types/EnumUserRole";
import { User } from "../user/user.entity";
import { MemberDataRespDTO } from "./dto/MemberDataRes.dto";
import { StudentsAndTeachersTdo } from "./dto/StudentsAndTeachers.dto";
import { JwtService } from "@nestjs/jwt";
import { RoleToken } from "src/shared/types/RoleToken";
import { ConfigService } from "@nestjs/config";
import { forwardRef, Inject } from '@nestjs/common';
import { ClassUser } from "./class-user.entity";
@Injectable()
export class ClassUserService{
    
    constructor(
        private classUserRepository: ClassUserRepository,
        //private classService: ClassService,
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
        ) {}

    async addMemberToClass(classroom: Class, userId: number, role: UserRole = UserRole.HS): Promise<string>{
        const user = await this.userService.findById(userId);
        if(!user){
            throw new BadRequestException("User not exist")
        }

        const newClassUser = this.classUserRepository.create({classroom:classroom, user:user, role})
        await this.classUserRepository.save(newClassUser); 

        //generate and return  token
        const payload : RoleToken= {
            userId : newClassUser.userId,
            classCodeId: newClassUser.classId,
            role: newClassUser.role,
        } 
        return await this.signRoleToken(payload);
    }


    async getClassesByUserId(userId: number): Promise<ClassResponseDto[]>{
        const user = await this.userService.findById(userId);
        if(!user){
            throw new BadRequestException("User not exist")
        }

        const classUsers = await this.classUserRepository.findClassesByUserId(userId);
        
        if (!classUsers || classUsers.length === 0) {
        return [];
        }
        
        return classUsers.map((classUser) => this.mapClassToClassResponseDto(classUser));
    }

    private mapClassToClassResponseDto(classUser: ClassUser): ClassResponseDto {
        const { title, creator, idCode } = classUser.classroom;
        const ClassResponse: ClassResponseDto = {
            title,
            creatorId: creator.id,
            idCode,
            role:classUser.role,
        }
        return ClassResponse;
    }

    async getStudentsAndTeachersByClassId(classId: string): Promise<StudentsAndTeachersTdo> {
        const classUsers = await this.classUserRepository.findUserByClassId(classId);
        const students = classUsers.filter((classUser) => classUser.role === UserRole.HS ||classUser.role ===UserRole.AD).map((classUser) => this.mapUserToMemberDataRespDto(classUser.user));
        const teachers = classUsers.filter((classUser) => classUser.role === UserRole.GV).map((classUser) => this.mapUserToMemberDataRespDto(classUser.user));

        return { students, teachers };
    }

    private mapUserToMemberDataRespDto(user: User): MemberDataRespDTO {
        const { email, fullname, id } = user;
        const MemberDataResp : MemberDataRespDTO = {
            email, 
            fullname, 
            id
        }
        return MemberDataResp;
    }

    async isUserInClass(userId:number, classId:string){
        const classUser = await this.classUserRepository.find({
            where:{classId, userId}
        })
        console.log(classUser);
        if(classUser){
            return true;
        }else{
            return false;
        }
    }

    async generateRoleToken(userId,classId){
        const classUser:ClassUser = await this.classUserRepository.findOne({
            where:{classId, userId}
        })

        if(!classUser){
            throw new BadRequestException("User not member of Class");
        }

        const payload: RoleToken = {
            userId: classUser.userId,
            classCodeId: classUser.classId,
            role: classUser.role,
        }

        const roleToken = await this.signRoleToken(payload);
        //Update refresh token to db
        return roleToken;
    }

    signRoleToken(payload: RoleToken):string{
        return this.jwtService.sign(
            payload
        ,
        {
          secret: this.configService.get('JWT_ACCESS_KEY'), 
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRED'),
        },
        )
    }
}
