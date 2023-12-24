import { Body, Controller , Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/AuthGuard";
import { GradeReviewService } from "./grade-review.service";
import { RoleGuard } from "src/shared/guards/RoleGuard";
import { Roles } from "src/shared/decorators/roles.decorator";
import { UserRole } from "src/shared/types/EnumUserRole";
import { GradeReviewReqDTO } from "./dto/request/gradeReviewReq.dto";
import { UserId } from "src/shared/decorators/userid.decorator";
import { GradeReviewRespDTO } from "./dto/response/gradeReviewResp.dto";

@Controller("grade-review")
@UseGuards(AuthGuard,RoleGuard)
export class GradeReviewController {
    constructor(
        private readonly gradeReviewService: GradeReviewService,
        ) {}

    @Roles([UserRole.HS])
    @Post('/:classIdCode')
    async handleCreateGradeReview(@Body() data: GradeReviewReqDTO,@Param('classIdCode') classIdCode: string, @UserId() userId :number): Promise<GradeReviewRespDTO>{
        return await this.gradeReviewService.createGradeReview(classIdCode,userId,data.structureId,data.expectPercentScore,data.explain); 
    }
}