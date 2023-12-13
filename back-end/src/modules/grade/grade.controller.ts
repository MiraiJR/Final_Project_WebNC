import {
  Body,
  Controller,
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

@Controller('grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post('/upload-grades')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadGradesCsv(
    @Body() dataReq: ClassIdDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    Checker.checkCsvFile(file, Constant.CSV_FILE_TYPE);
    const { classId } = dataReq;

    const gradeStudents = await FileHandler.readFileCsvForGradeStudent(file);
    await this.gradeService.insertListGradeStudent(classId, gradeStudents);
    return 'Upload grades for students successfully!';
  }
}
