import { UserRespDTO } from "src/modules/user/dto/response/UserResp";

export class GradeReviewCommentResponse {
    content: string;
    createdAt: Date;
    author: UserRespDTO;
    reviewId: number;
}