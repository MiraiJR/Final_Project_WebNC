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

@Controller('class')
@UseGuards(AuthGuard)
export class ClassController {
    constructor(
        private readonly classService: ClassService,
        private readonly classUserService: ClassUserService,
        ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async handleCreateClass(@Body() createClassDto:CreateClassDto,@UserId() userId: number): Promise<ClassResponseDto>{
        console.log(userId);
        return await this.classService.create(createClassDto,userId);
    }

    @Get('/all')
    async handleGetAllClassByUserID(@UserId() userId: number):Promise<ClassResponseDto[]>{
        return this.classUserService.getClassesByUserId(userId);
    }

    @Get('/:classIdCode/list')
    async handleGetListStudentsAndTeacher(@Param('classIdCode') classIdCode: string): Promise<StudentsAndTeachersTdo>{
        return this.classUserService.getStudentsAndTeachersByClassId(classIdCode);
    }

    @Get('/:classIdCode')
    async handleGetClassDetail(@Param('classIdCode') classIdCode: string) : Promise<Class>{
        return this.classService.findByIdCode(classIdCode);
    }


}
