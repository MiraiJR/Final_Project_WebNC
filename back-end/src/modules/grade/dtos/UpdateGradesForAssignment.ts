import { IsNotEmpty } from 'class-validator';

export class UpdateGradesForAssignmentReq {
  @IsNotEmpty()
  gradeStructureId: number;
}
