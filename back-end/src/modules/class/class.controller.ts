import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/class/CreateClass.dto';
import { UserId } from 'src/shared/decorators/userid.decorator';
import { AuthGuard } from 'src/shared/guards/AuthGuard';
import { ClassResponseDto } from './dto/class/ClassResponse.dto';
import { ClassUserService } from '../classUser/class-user.service';
import { StudentsAndTeachersTdo } from '../classUser/dto/StudentsAndTeachers.dto';
import { ClassDetailResponseDto } from './dto/class/ClassDetailResponse.dto';
import { RoleGuard } from 'src/shared/guards/RoleGuard';
import { UserRole } from 'src/shared/types/EnumUserRole';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { InviteMailReqDto } from './dto/class/InviteMailReq.dto';
import { GradeStructureService } from '../grade-structure/grade-structure.service';
import { GradeStructureRespDTO } from '../grade-structure/dto/response/GradeStructureResp';
import { GradeReviewService } from '../grade-review/grade-review.service';
import { GradeReviewRespDTO } from '../grade-review/dto/response/gradeReviewResp.dto';
import { GradeService } from '../grade/grade.service';
import { UpdateGradeRespDTO } from './dto/class/UpdateGradeResp.dto';
import { AdminClassResponseDto } from './dto/class/AdminClassResponse.dto';
import { AdminAuthGuard } from 'src/shared/guards/AdminAuthGuard';

@Controller('class')
@UseGuards(AuthGuard)
export class ClassController {
    constructor(
        private readonly classService: ClassService,
        private readonly classUserService: ClassUserService,
        private readonly classGradeStructureService: GradeStructureService,
        private readonly gradeReviewService: GradeReviewService,
        ) {}

  @UseGuards(AdminAuthGuard)
  @Get('/')
  async handleGetAllClass(): Promise<AdminClassResponseDto[]> {
    return await this.classService.getAllClass();
  }
        
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async handleCreateClass(
    @Body() createClassDto: CreateClassDto,
    @UserId() userId: number,
  ): Promise<ClassDetailResponseDto> {
    return await this.classService.create(createClassDto, userId);
  }

  //Tham gia lớp
  @Post('/join/:classCodeId')
  @HttpCode(HttpStatus.CREATED)
  async handleJoinClass(
    @Param('classCodeId') classCodeId: string,
    @UserId() userId: number,
  ): Promise<ClassDetailResponseDto> {
    return await this.classService.joinClassAsStudent(classCodeId, userId);
  }

  //accept mail
  @Get('/acceptInvite')
  async handAccpetLinkInvite(@UserId() userId: number, @Query() query) {
    return await this.classService.handleAcceptLinkInvite(query.token, userId);
  }

  //Lấy ds Class của USER qua userid
  @Get('/all')
  async handleGetAllClassByUserID(
    @UserId() userId: number,
  ): Promise<ClassResponseDto[]> {
    return await this.classUserService.getClassesByUserId(userId);
  }

  //Lấy ds HS và giáo viên
  @UseGuards(RoleGuard)
  @Get('/:classIdCode/members')
  @Roles([UserRole.HS, UserRole.GV, UserRole.AD])
  async handleGetListStudentsAndTeacher(
    @Param('classIdCode') classIdCode: string,
  ): Promise<StudentsAndTeachersTdo> {
    return await this.classUserService.getStudentsAndTeachersByClassId(
      classIdCode,
    );
  }

  @Get('/:classIdCode')
  async handleGetClassDetail(
    @Param('classIdCode') classIdCode: string,
    @UserId() userId: number,
  ): Promise<ClassDetailResponseDto> {
    return this.classService.getDetailClass(classIdCode, userId);
  }

  @UseGuards(RoleGuard)
  @Post('/:classIdCode/inviteMail')
  @Roles([UserRole.GV, UserRole.AD])
  async handleSendInviteMail(
    @Param('classIdCode') classIdCode: string,
    @Body() data: InviteMailReqDto,
  ) {
    return await this.classService.sendInviteEmail(
      data.emails,
      classIdCode,
      data.role,
    );
  }

    @Get('/:classIdCode/gradeStructure')
    async handleGetGradeStructure(@Param('classIdCode') classIdCode: string): Promise<GradeStructureRespDTO>{
        return await this.classGradeStructureService.getGradeStructureByClassId(classIdCode);
    }

    @Post('/:classIdCode/gradeStructure')
    async handlePostGradeStructure(@Param('classIdCode') classIdCode: string, 
    @Req() req,): Promise<string>{
         const gradeStructureRespDTO: GradeStructureRespDTO = req.body;
        await this.classGradeStructureService.updateGradeStructure(classIdCode , gradeStructureRespDTO);
         return "Updated gradeStructure successfully"
    }

    @Get('/:classIdCode/gradeReviews')
    async handleGetGradeReview(@Param('classIdCode') classIdCode: string): Promise<GradeReviewRespDTO[]>{
        return await this.gradeReviewService.getGradeReviewByClassId(classIdCode);
    }

    @Post('/updateScore')
    async handleUpdateScore( @Req() req): Promise<string>{
        const data: UpdateGradeRespDTO = req.body;
        await this.gradeReviewService.updateScoreAndChangeStateOfReview(data.studentId, data.structureId, data.newScore);
        return "Updated score successfully"
    }

    @UseGuards(AdminAuthGuard)
    @Patch('/:classIdCode/updateState')
    async handleUpdateState(@Param('classIdCode') classIdCode: string, @Body() data): Promise<string>{
        await this.classService.updateClassState(classIdCode, data.isActive); 
        return "Updated class state successfully"
    }
}
