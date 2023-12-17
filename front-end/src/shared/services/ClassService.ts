import axiosClient from "../libs/axios";
import { SendInviteMailReq } from "../types/Req/SendInviteMailRequest";
import {
  ClassDetailResp,
  ClassMembersListResp,
  ClassRespData,
  GradeReviewResp,
  GradeStructureResp,
} from "../types/Resp/ClassResp";

const ClassService = {
  getClassList: () => axiosClient.get<ClassRespData[]>("/class/all"),
  createClass: (data: CreateClassReq) =>
    axiosClient.post<ClassDetailResp>("/class/create", data),
  joinClass: (classID: string) =>
    axiosClient.post<ClassDetailResp>(`/class/join/${classID}`),
  getClassDetail: (classID: string) =>
    axiosClient.get<ClassDetailResp>(`/class/${classID}`),
  getMemberList: (classID: string) =>
    axiosClient.get<ClassMembersListResp>(`/class/${classID}/members`),
  inviteEmailSend: (classID: string, data: SendInviteMailReq) =>
    axiosClient.post<string>(`/class/${classID}/inviteMail`, data),
  acceptInviteEmail: (token: string) =>
    axiosClient.get<ClassDetailResp>(`/class/acceptInvite/?token=${token}`),
  getGradeStructure: (classID: string) =>
    axiosClient.get<GradeStructureResp>(`/class/${classID}/gradeStructure`),
  updateGradeStructure: (classID: string, data: GradeStructureResp) =>
    axiosClient.post<string>(`/class/${classID}/gradeStructure`, data),
  getGradeReviews: (classID: string) => 
    axiosClient.get<GradeReviewResp[]>(`/class/${classID}/gradeReviews`),
  updateScore: (data: UpdateGrade) => 
    axiosClient.post<string>(`/class/updateScore`, data),
};

export default ClassService;
