import ClassService from "@/shared/services/ClassService";
import JwtStorage from "@/shared/storages/JwtStorage";
import { ClassDetailResp } from "@/shared/types/Resp/ClassResp";
import { CodeResponse } from "@/shared/utils/codeResponse";
import { redirect } from "react-router-dom";
import { toast } from 'react-toastify';

export async function joinClassLoader({params}:any) {
    if(JwtStorage.getToken()?.accessToken==""){
        redirect ('/auth/sign-in?next='+window.location.pathname);
    }

    try{
        const response : ClassDetailResp = (await ClassService.joinClass(params.classID)).data;
        return redirect(`/class/${response.idCode}`);
    }catch(e:any){
        if(e.message == CodeResponse.UNAUTHORIZED){
            return redirect('/');
        }

        toast.error(e.message);
        return redirect(window.location.href);
    }
}