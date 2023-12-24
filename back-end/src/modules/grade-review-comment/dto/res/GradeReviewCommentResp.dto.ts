import { UserRespDTO } from "src/modules/user/dto/response/UserResp";

export class GradeReviewResponse {
    content: string;
    createdAt: Date;
    author: UserRespDTO;
}