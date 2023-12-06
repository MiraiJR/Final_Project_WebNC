import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, LoaderFunction, Outlet, useLoaderData, useLocation, useOutletContext, useParams } from 'react-router-dom';
import { useState } from 'react';
import ClassService from '@/shared/services/ClassService';
import { ClassDetailResp } from '@/shared/types/Resp/ClassResp';
import { toast } from 'react-toastify';

enum TagValue {
    Feed = 'feed',
    List = 'list',
    Grade = 'grade',
}

type ClassDetail = {
    title: string;
    creatorId: number;
    idCode: string;
    roleToken: string;
}

// Hàm kiểm tra xem chuỗi có trong enum hay không
function isStringInEnum(value: string): value is TagValue {
    return Object.values(TagValue).includes(value as TagValue);
  }

export default function ClassDetail() {
    const classDetail : ClassDetail = useLoaderData() as ClassDetail
    let {pathname} = useLocation();
    const pathnameSplit = pathname.split('/');
    function initValue () : string{
        if(pathnameSplit.length <4){
            return TagValue.Feed;
        }
        if(isStringInEnum(pathnameSplit[3])){
            return pathnameSplit[3];
        }else{
            return "";
        }
    }


    let {classID} = useParams();
    let link = `/class/${classID}`
    const [value, setValue] = useState<TagValue|string>(initValue());
    const handleChange = (event: React.SyntheticEvent, newValue: TagValue) => {
        setValue(newValue);
    };
    
    return (
        <Box>
            <Tabs onChange={handleChange} value={value} >
                <Tab value={TagValue.Feed} label="Feed"  component={Link} to={link}/>
                <Tab value={TagValue.List} label="Member" component={Link} to={link+`/${TagValue.List}`}/>
                <Tab value={TagValue.Grade} label="Grade"  component={Link} to={link+`/${TagValue.Grade}`}/>
            </Tabs>
            <Box margin='20px' display="flex" justifyContent="center" >
                <Outlet context={classDetail}></Outlet>
            </Box>
        </Box>
    )

}

export async function classDetailLoader  ({params}:any) : Promise<ClassDetail> {
    console.log(1);
    try{
        const classDetailResp : ClassDetailResp  = (await ClassService.getClassDetail(params.classID)).data;
        console.log(1)
        const classDetail : ClassDetail = classDetailResp as ClassDetail;
        return classDetail;
    }catch(e:any){
        toast.error(e.message);
        throw new Error(e);     
    }
}

export function useClassDetail() :ClassDetail {
    return useOutletContext<ClassDetail>();
}