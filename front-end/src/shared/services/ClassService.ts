import axiosClient from "../libs/axios";
import { SendInviteMailReq } from "../types/Req/SendInviteMailRequest";
import { ClassDetailResp, ClassMembersListResp, ClassRespData, GradeAssignmentResp } from "../types/Resp/ClassResp";

const ClassService ={
    getClassList : ()=> axiosClient.get<ClassRespData[]>('/class/all'),
    createClass : (data:CreateClassReq)=> axiosClient.post<ClassDetailResp>('/class/create',data),
    joinClass: (classID: string) => axiosClient.post<ClassDetailResp>(`/class/join/${classID}`),
    getClassDetail : (classID: string) => axiosClient.get<ClassDetailResp>(`/class/${classID}`),
    getMemberList : (classID: string) => axiosClient.get<ClassMembersListResp>(`/class/${classID}/members`),
    inviteEmailSend : (classID: string,data:SendInviteMailReq) => axiosClient.post<string>(`/class/${classID}/inviteMail`,data),
    acceptInviteEmail: (token: string) => axiosClient.get<ClassDetailResp>(`/class/acceptInvite/?token=${token}`),
    getGradeStructure: (classID: string) => axiosClient.get<GradeAssignmentResp[]>(`/class/${classID}/gradeStructure`),
    updateGradeStructure: (classID: string, data: GradeAssignmentResp[]) => axiosClient.post<GradeAssignmentResp[]>(`/class/${classID}/gradeStructure`,data),
}

export default ClassService;