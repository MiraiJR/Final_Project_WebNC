import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateStudentReqDto {
  @IsNotEmpty({ message: 'User id cannot be null!' })
  @IsNumber()
  userId: number;

  @IsString()
  studentId: string;
}
