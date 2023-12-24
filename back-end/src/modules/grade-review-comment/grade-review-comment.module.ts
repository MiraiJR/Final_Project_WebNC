import { Module, forwardRef } from "@nestjs/common";
import { GradeReviewCommentRepository } from "./grade-review-comment.repository";
import { GradeReviewController } from "../grade-review/grade-review.controller";
import { GradeReviewCommentService } from "./grade-review-comment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GradeReviewComment } from "./grade-review-comment.entity";
import { GradeReviewModule } from "../grade-review/grade-review.module";
import { GradeReviewCommentGateWay } from "./grade-review-comment.gateway";
import { UserModule } from "../user/user.module";


@Module({
    imports : [TypeOrmModule.forFeature([GradeReviewComment]),
    forwardRef(()=> GradeReviewModule),
    forwardRef(()=> UserModule),
    forwardRef(()=> GradeReviewModule)],
    providers: [GradeReviewCommentRepository,GradeReviewCommentService,GradeReviewCommentGateWay],
    controllers: [GradeReviewController],
    exports: [GradeReviewCommentService],
})
export class GradeReviewCommentModule{}