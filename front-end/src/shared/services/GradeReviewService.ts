import axiosClient from "../libs/axios";


export const GradeReviewService = {
    createGradeReviewService : (classID:string,data:GradeReviewReq) => axiosClient.post(`/grade-review/${classID}`,data),
    getGradeReviewDetailService : (classID:string,reviewID: number) => axiosClient.get(`/grade-review/${classID}/${reviewID}`),
    getGradeReviewByStructureId : (classID:string, structureId: number) => axiosClient.get(`/grade-review/${classID}?structureId=${structureId}`)
}