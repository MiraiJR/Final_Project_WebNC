import axiosClient from "../libs/axios";
import { ClassDetailResp, ClassRespData } from "../types/Resp/ClassResp";

const ClassService ={
    getClassList : ()=> axiosClient.get<ClassRespData[]>('/class/all'),
    createClass : (data:CreateClassReq)=> axiosClient.post<ClassDetailResp>('/class/create',data)
}

export default ClassService;