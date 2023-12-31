import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateStatusGradeForAllReq {
  @IsNotEmpty()
  @IsBoolean()
  isFinalized: boolean;

  @IsNotEmpty()
  gradeStructureId: number;
}
