import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ClassUserRepository } from "./class-user.repository";
import { ClassService } from "../class/class.service";
import { UserService } from "src/modules/user/user.service";
import { Class } from "../class/class.entity";
import { ClassResponseDto } from "../class/dto/class/ClassResponse.dto";
import { UserRole } from "src/shared/types/EnumUserRole";
import { User } from "../user/user.entity";
import { UserDataRespDTO } from "./dto/UserDataRes.dto";
import { StudentsAndTeachersTdo } from "./dto/StudentsAndTeachers.dto";

@Injectable()
export class ClassUserService{
    constructor(
        private classUserRepository: ClassUserRepository,
        private classService: ClassService,
        private userService: UserService,
        ) {}

    async joinClass(classIdCode: string, userId: number): Promise<string>{
        const classFound = await this.classService.findByIdCode(classIdCode);
        if(!classFound){
            throw new BadRequestException("Class Code is not exist")
        }
        const user = await this.userService.findById(userId);
        if(!user){
            throw new BadRequestException("User not exist")
        }

        const newClassUser = this.classUserRepository.create({classroom:classFound, user:user})
        await this.classUserRepository.save(newClassUser); 
        return "Join Class success";
    }

    async getClassesByUserId(userId: number): Promise<ClassResponseDto[]>{
        const user = await this.userService.findById(userId);
        if(!user){
            throw new BadRequestException("User not exist")
        }

        const classUsers = await this.classUserRepository.find({
            where: { userId },
            relations: ['classroom', 'classroom.creator'],
        });
        
        if (!classUsers || classUsers.length === 0) {
        return [];
        }
        
        return classUsers.map((classUser) => this.mapToClassResponseDto(classUser.classroom));
    }

    private mapToClassResponseDto(classroom: Class): ClassResponseDto {
        const { title, creator, idCode } = classroom;
        return {
            title,
            creatorId: creator.id,
            idCode,
        };
    }

    async getStudentsAndTeachersByClassId(classId: string): Promise<StudentsAndTeachersTdo> {
        const classUsers = await this.classUserRepository.find({
            where: { classId },
            relations: ['user'],
        });

        const students = classUsers.filter((classUser) => classUser.role === UserRole.HS).map((classUser) => this.mapToUserDataRespDto(classUser.user));
        const teachers = classUsers.filter((classUser) => classUser.role === UserRole.GV).map((classUser) => this.mapToUserDataRespDto(classUser.user));

        return { students, teachers };
    }

    private mapToUserDataRespDto(user: User): UserDataRespDTO {
        const { email, fullname, id } = user;
        return { email, fullname, id };
    }

    
}
