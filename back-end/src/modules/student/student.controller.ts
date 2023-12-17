import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Checker } from 'src/shared/utils/Checker';
import { Constant } from 'src/shared/constant';
import { FileHandler } from 'src/shared/utils/Filehandler';
import { ClassIdDto } from '../grade/dtos/CreateGradeReq';

@Controller('students')
export class StudentController {
  gradeService: any;
  constructor(private readonly studentService: StudentService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadStudentListCsv(
    @Body() dataReq: ClassIdDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    Checker.checkCsvFile(file, Constant.CSV_FILE_TYPE);
    const { classId } = dataReq;

    const students = await FileHandler.readFileCsvForStudent(file);
    await this.studentService.insertListStudent(students, classId);

    return 'Upload list student for class successfully!';
  }
}
