import { Injectable } from "@nestjs/common";
import { GradeReviewCommentRepository } from "./grade-review-comment.repository";


@Injectable()
export class GradeReviewCommentService{
    constructor (
        private gradeReviewCommentRepository: GradeReviewCommentRepository,
    ){}
}