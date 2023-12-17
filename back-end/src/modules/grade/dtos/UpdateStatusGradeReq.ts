import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateStatusGradeReq {
  @IsNotEmpty()
  @IsBoolean()
  isFinalized: boolean;

  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  gradeStructureId: number;
}
