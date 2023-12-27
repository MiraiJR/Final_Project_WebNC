import { Body, Controller , Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/AuthGuard";
import { GradeReviewService } from "./grade-review.service";
import { RoleGuard } from "src/shared/guards/RoleGuard";
import { Roles } from "src/shared/decorators/roles.decorator";
import { UserRole } from "src/shared/types/EnumUserRole";
import { GradeReviewReqDTO } from "./dto/request/gradeReviewReq.dto";
import { UserId } from "src/shared/decorators/userid.decorator";
import { GradeReviewRespDTO } from "./dto/response/gradeReviewResp.dto";
import { GradeReviewCommentResponse } from "../grade-review-comment/dto/res/GradeReviewCommentResp.dto";
import { GradeReviewCommentService } from "../grade-review-comment/grade-review-comment.service";
import { GradeReviewCommentReq } from "../grade-review-comment/dto/req/GradeReviewCommentReq.dto";

@Controller("grade-review")
@UseGuards(AuthGuard,RoleGuard)
export class GradeReviewController {
    constructor(
        private readonly gradeReviewService: GradeReviewService,
        private readonly gradeReviewCommentService: GradeReviewCommentService,
        ) {}

    @Roles([UserRole.HS])
    @Post('/:classIdCode')
    async handleCreateGradeReview(@Body() data: GradeReviewReqDTO,@Param('classIdCode') classIdCode: string, @UserId() userId :number): Promise<GradeReviewRespDTO>{
        return await this.gradeReviewService.createGradeReview(classIdCode,userId,data.structureId,data.expectPercentScore,data.explain); 
    }

    @Roles([UserRole.HS,UserRole.AD,UserRole.GV])
    @Get('/:classIdCode')
    async handleGetReviewQuery(@UserId() userId: number, @Query('structureId') structureId: number): Promise<GradeReviewRespDTO>{
        return await this.gradeReviewService.getGradeReviewDetailByStructureId(userId,structureId);
    }

    @Roles([UserRole.HS,UserRole.AD,UserRole.GV])
    @Get('/:classIdCode/:reviewId')
    async handleGetDetailReview(@UserId() userId: number, @Param('reviewId') reviewId: number) : Promise<GradeReviewRespDTO>{
        return await this.gradeReviewService.getGradeReviewDetail(reviewId,userId);
    }

    @Roles([UserRole.HS,UserRole.AD,UserRole.GV])
    @Post('/:classIdCode/:reviewId/comment')
    async handlePostComment(@Body() data: GradeReviewCommentReq,@UserId() userId: number, @Param('reviewId') reviewId:number): Promise<GradeReviewCommentResponse>{
        return await this.gradeReviewCommentService.createComment(userId,reviewId,data.content);
    }

    
}