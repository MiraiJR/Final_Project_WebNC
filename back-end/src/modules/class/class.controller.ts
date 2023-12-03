import { Body, Controller,Get,HttpCode,HttpStatus,Param,Post, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/class/CreateClass.dto';
import { Class } from './class.entity';

import { User } from '../user/user.entity';
import { UserId } from 'src/shared/decorators/userid.decorator';
import { AuthGuard } from 'src/shared/guards/AuthGuard';
import { ClassRepository } from './class.repository';
import { ClassResponseDto } from './dto/class/ClassResponse.dto';
import { ClassUserService } from '../classUser/class-user.service';
import { StudentsAndTeachersTdo } from '../classUser/dto/StudentsAndTeachers.dto';
import { ClassDetailResponseDto } from './dto/class/ClassDetailResponse.dto';
import { RoleGuard } from 'src/shared/guards/RoleGuard';
import { UserRole } from 'src/shared/types/EnumUserRole';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Controller('class')
@UseGuards(AuthGuard)
export class ClassController {
    constructor(
        private readonly classService: ClassService,
        private readonly classUserService: ClassUserService,
        ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async handleCreateClass(@Body() createClassDto:CreateClassDto,@UserId() userId: number): Promise<ClassDetailResponseDto>{
        return await this.classService.create(createClassDto,userId);
    }

    //Tham gia lớp
    @Post('/join/:classCodeId')
    @HttpCode(HttpStatus.CREATED)
    async handleJoinClass(@Param('classCodeId') classCodeId : string, @UserId() userId: number): Promise<ClassDetailResponseDto>{
        return await this.classService.joinClassAsStudent(classCodeId,userId);
    }

    //Lấy ds Class của USER qua userid
    @Get('/all')
    async handleGetAllClassByUserID(@UserId() userId: number):Promise<ClassResponseDto[]>{
        return await this.classUserService.getClassesByUserId(userId);
    }

    //Lấy ds HS và giáo viên
    @UseGuards(RoleGuard)
    @Get('/:classIdCode/members')
    @Roles([UserRole.HS])
    async handleGetListStudentsAndTeacher(@Param('classIdCode') classIdCode: string): Promise<StudentsAndTeachersTdo>{
        return await this.classUserService.getStudentsAndTeachersByClassId(classIdCode);
    }

    @Get('/:classIdCode')
    async handleGetClassDetail(@Param('classIdCode') classIdCode: string,@UserId() userId: number) : Promise<ClassDetailResponseDto>{
        return this.classService.getDetailClass(classIdCode,userId);
    }


}
