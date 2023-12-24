import { IsNotEmpty } from "class-validator";

export class GradeReviewReqDTO {
    @IsNotEmpty()
    structureId: number;
    @IsNotEmpty()
    expectPercentScore: number;
    @IsNotEmpty()
    explain: string;
  }
  