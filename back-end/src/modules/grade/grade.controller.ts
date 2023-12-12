import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
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

    const gradeStudents = await FileHandler.readFileCsv(file);
    return this.gradeService.insertListGradeStudent(classId, gradeStudents);
  }
}
