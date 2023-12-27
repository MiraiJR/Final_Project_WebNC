import { BadRequestException, Injectable } from "@nestjs/common";
import { GradeReviewCommentRepository } from "./grade-review-comment.repository";
import { GradeReviewCommentResponse } from "./dto/res/GradeReviewCommentResp.dto";
import { GradeReviewCommentGateWay } from "./grade-review-comment.gateway";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { GradeReviewService } from "../grade-review/grade-review.service";
import { ClassUserService } from "../classUser/class-user.service";
import { UserRole } from "src/shared/types/EnumUserRole";


@Injectable()
export class GradeReviewCommentService{
    constructor (
        private gradeReviewCommentRepository: GradeReviewCommentRepository,
        private readonly commentsGateway: GradeReviewCommentGateWay,
        private readonly userService: UserService,
        private readonly gradeReviewService: GradeReviewService,
        private readonly classUserService: ClassUserService,
    ){}

    async createComment(userId:number, reviewId: number,content:string):Promise<GradeReviewCommentResponse>{
        const user: User = await this.userService.findById(userId);
        if(!user){
            throw new BadRequestException("User not exist");
        }
        const review = await this.gradeReviewService.findGrandReviewById(reviewId);
        if(!reviewId){
            throw new BadRequestException("Review not exist");
        }else if(review.isFinalized){
            throw new BadRequestException("Review is finalize");
        }

        const role= await this.classUserService.findRole(review.classIdCode,userId);
        if(!role){
            throw new BadRequestException("User not in this class")
        }else if(role == UserRole.HS && user.studentId != review.studentId){
            throw new BadRequestException("This review is not of you")
        }
        

        const createGradeReviewComment = await this.gradeReviewCommentRepository.create({
            user: user,
            content,
            review,
        })

        const savedCreateGradeReviewComment = await this.gradeReviewCommentRepository.save(createGradeReviewComment);
        const response: GradeReviewCommentResponse = {
            reviewId: reviewId,
            author: {
                email: user.email,
                fullname: user.fullname,
                studentId: user.studentId,
            },
            content: savedCreateGradeReviewComment.content,
            createdAt: savedCreateGradeReviewComment.createdAt,
        }

        this.commentsGateway.handleComment(response);

        return response;
    }
}