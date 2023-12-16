import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Checker } from 'src/shared/utils/Checker';
import { Constant } from 'src/shared/constant';
import { FileHandler } from 'src/shared/utils/Filehandler';
import { ClassIdDto } from './dtos/CreateGradeReq';
import { UpdateGradeReq } from './dtos/UpdateGradeReq';
import { UpdateStatusGradeReq } from './dtos/UpdateStatusGradeReq';
import { UpdateStatusGradeForAllReq } from './dtos/UpdateStatusGradeForAllReq';
import { UpdateGradesForAssignmentReq } from './dtos/UpdateGradesForAssignment';

@Controller('grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post('/upload-grades')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadGradesCsv(
    @Body() dataReq: ClassIdDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    Checker.checkCsvFile(file, Constant.CSV_FILE_TYPE);
    const { classId } = dataReq;

    const gradeStudents = await FileHandler.readFileCsvForGradeStudent(file);
    await this.gradeService.insertListGradeStudent(classId, gradeStudents);
    return 'Upload grades for students successfully!';
  }

  @Post('/upload-grades/assignments')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadGradesForAssignmentCsv(
    @Body() dataReq: UpdateGradesForAssignmentReq,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    Checker.checkCsvFile(file, Constant.CSV_FILE_TYPE);
    const { gradeStructureId } = dataReq;
    const gradeStudents =
      await FileHandler.readFileCsvForGradeInSpecificAssignment(file);
    await this.gradeService.updateGradeForSpecificAssignment(
      gradeStructureId,
      gradeStudents,
    );
    return 'Upload grades for this assignment successfully!';
  }

  @Get('/class/:classId')
  @UseInterceptors(FileInterceptor('file'))
  async handleGetGetGradeOfClass(
    @Param('classId') classId: string,
  ): Promise<GradeStudentResp[]> {
    return await this.gradeService.getGradeStudentsOfClass(classId);
  }

  @Patch('/update-score')
  async handleUpdateGradeStudent(@Body() reqData: UpdateGradeReq) {
    const { newScore, studentId, gradeStructureId } = reqData;
    await this.gradeService.updateScoreForStudentInGradeStructure(
      studentId,
      gradeStructureId,
      newScore,
    );

    return 'Update score successfully!';
  }

  @Patch('/update-status/students')
  async handleUpdateStatusGrade(@Body() reqData: UpdateStatusGradeReq) {
    const { isFinalized, studentId, gradeStructureId } = reqData;
    await this.gradeService.updateStatusGradeForStudent(
      studentId,
      gradeStructureId,
      isFinalized,
    );

    return `${isFinalized ? 'Finalized' : 'Draft'} score successfully!`;
  }

  @Patch('/update-status/assignments')
  async handleUpdateStatusGradeForAllStudents(
    @Body() reqData: UpdateStatusGradeForAllReq,
  ) {
    const { isFinalized, gradeStructureId } = reqData;

    await this.gradeService.updateStatusGradeForAllStudents(
      gradeStructureId,
      isFinalized,
    );
    return `${isFinalized ? 'Finalized' : 'Draft'} assignment successfully!`;
  }
}
