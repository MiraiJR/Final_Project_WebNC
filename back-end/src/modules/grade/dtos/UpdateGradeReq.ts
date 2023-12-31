import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGradeReq {
  @IsNotEmpty()
  @IsNumber()
  newScore: number;

  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  gradeStructureId: number;
}
