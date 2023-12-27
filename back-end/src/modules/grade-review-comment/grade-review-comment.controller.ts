import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/AuthGuard";
import { GradeReviewCommentService } from "./grade-review-comment.service";



@Controller()
@UseGuards(AuthGuard)
export class GradeReviewCommentController{
    constructor(
        private readonly gradeReviewCommentService: GradeReviewCommentService
    ){}
}