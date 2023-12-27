import { GradeReviewCommentResponse } from "src/modules/grade-review-comment/dto/res/GradeReviewCommentResp.dto";

export class GradeReviewRespDTO {
    id: number;
    structureId: number;
    studentId: string;
    studentName: string;
    nameAssignment: string;
    currPercentScore: number;
    expectPercentScore: number;
    explain: string;
    comment: GradeReviewCommentResponse[];
  }
  