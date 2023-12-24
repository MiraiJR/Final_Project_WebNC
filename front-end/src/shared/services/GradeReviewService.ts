import axiosClient from "../libs/axios";


export const GradeReviewService = {
    createGradeReviewService : (classID:string,data:GradeReviewReq) => axiosClient.post(`/grade-review/${classID}`,data),
}