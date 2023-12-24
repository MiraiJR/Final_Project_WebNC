import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { GradeReviewComment } from "./grade-review-comment.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class GradeReviewCommentRepository extends Repository<GradeReviewComment>{
    constructor(
        @InjectRepository(GradeReviewComment)
        repository : Repository<GradeReviewComment>,
    ){
        super(repository.target, repository.manager, repository.queryRunner);
    }
}