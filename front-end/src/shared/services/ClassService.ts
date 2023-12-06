import axiosClient from "../libs/axios";
import { ClassRespData } from "../types/Resp/ClassResp";

const ClassService ={
    getClassList : ()=> axiosClient.get<ClassRespData[]>('/class/all'),
}

export default ClassService;