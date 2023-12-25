import { IsNotEmpty } from "class-validator";

export class GradeReviewCommentReq {
    @IsNotEmpty()
    content: string;
}