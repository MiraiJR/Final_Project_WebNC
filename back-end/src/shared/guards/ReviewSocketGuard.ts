import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Observable } from "rxjs";
import { ClassUserService } from "src/modules/classUser/class-user.service";
import { GradeReviewService } from "src/modules/grade-review/grade-review.service";
import { UserRole } from "../types/EnumUserRole";
import { UserService } from "src/modules/user/user.service";


@Injectable()
export class ReviewSocketGuard implements CanActivate{
    constructor(
        private readonly gradeReviewService: GradeReviewService,
        private readonly classUserService: ClassUserService,
        private readonly userService: UserService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToWs().getClient();
        console.log(request);
        const reviewId = request.body;
        const review = await this.gradeReviewService.findGrandReviewById(reviewId);
        if(!review){
            throw new WsException("reviewId not valid");
        }
        const role = await this.classUserService.findRole(review.classIdCode,request.user)
        const user = await this.userService.findById(request.user)
        if(role==UserRole.HS && user.studentId != review.studentId){
            throw new WsException("You dont have permission for this review")
        }
        request.reviewId = reviewId;

        return true;
      }
}