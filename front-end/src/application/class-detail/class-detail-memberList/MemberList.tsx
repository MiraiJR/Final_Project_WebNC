import { Avatar, Divider, IconButton, List, ListItemAvatar } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import { UserPlus } from "lucide-react";
import Box from '@mui/material/Box';
import ClassService from "@/shared/services/ClassService";
import {  ClassDetailResp, ClassMembersListResp } from "@/shared/types/Resp/ClassResp";
import { toast } from 'react-toastify';
import { useLoaderData } from "react-router-dom";
import { Helper } from "@/shared/utils/heper";
import { MAIN_COLOR } from "@/shared/utils/constant";
import React from "react";
import InviteTeacherFormDialog from "./InviteFormDialog/InviteTeacherFormDialog";
import { useClassDetail } from "../ClassDetail";
import { UserRole } from "@/shared/types/UserRole";
import InviteStudentFormDialog from "./InviteFormDialog/InviteStudentFormDialog";



export default function MemberList(){

    const memberList = useLoaderData() as ClassMembersListResp;
    const classDetail = useClassDetail() as ClassDetailResp;

    const [inviteTeacherOpen,setInviteTeacherOpen] = React.useState<boolean>(false);
    const [inviteStudentOpen,setInviteStudentOpen] = React.useState<boolean>(false);
    
    const TeacherListItem = ()=>{
        return  memberList.teachers.map((member)=>(
            <ListItem key = {member.id}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: MAIN_COLOR }}>{Helper.getFullNameIcon(member.fullname)}</Avatar>
                </ListItemAvatar>
                <p>{member.fullname}</p>
            </ListItem>
        ))
    }

    const StudentListItem = ()=>{
        return  memberList.students.map((member)=>(
            <ListItem key = {member.id}>
                <ListItemAvatar>
                    <Avatar >{Helper.getFullNameIcon(member.fullname)}</Avatar>
                </ListItemAvatar>
                <p>{member.fullname}</p>
            </ListItem>
        ))
    }

    const getTeacherEmails =()=>{
        const emails: string[] = memberList.teachers.map(teacher => teacher.email);
        return emails
    }

    const getAllUserMails = ()=>{
        const teacherEmails: string[] = getTeacherEmails();
        const studentEmails: string[] =  memberList.students.map(student => student.email);
        return [...teacherEmails,...studentEmails]
    }

    return(
        <Box width="100%" maxWidth='1000px'>
            <Box>
                <div className={`flex justify-between w-100 items-center text-rose-400`}>
                    <p className={`text-base`}>Teachers</p>
                    {classDetail.role != UserRole.HS &&(
                    <>
                         <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={()=>setInviteTeacherOpen(true)}
                        >
                            <UserPlus />
                        
                        </IconButton>
                        <InviteTeacherFormDialog open={inviteTeacherOpen} onClose={()=>setInviteTeacherOpen(false)} teacherEmailList={getTeacherEmails()}></InviteTeacherFormDialog>
                     </>
                    ) }
                   
                </div>
                <Divider className="bg-rose-400"></Divider>
                <List>
                    {TeacherListItem()}
                </List>
            </Box>
            <Box>
                <div className={`flex justify-between w-100 items-center text-rose-400`}>
                    <p className={`text-base`}>Students</p>
                    {classDetail.role != UserRole.HS &&(
                        <>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={()=>setInviteStudentOpen(true)}
                            >
                                <UserPlus />
                            </IconButton>
                            <InviteStudentFormDialog memberEmailList={getAllUserMails()} open={inviteStudentOpen} onClose={()=>setInviteStudentOpen(false)}></InviteStudentFormDialog>
                        </>
                    )}
                    
                </div>
                <Divider className="bg-rose-400"></Divider>
                <List>
                    {StudentListItem()}
                </List>
            </Box>
        </Box>
    )
}

export async function memberListLoader ({params}:any) : Promise<ClassMembersListResp>{
    try{
        const memberList : ClassMembersListResp = (await ClassService.getMemberList(params.classID)).data;

        return memberList;
    }catch(e: any){
        toast.error(e.message);
        throw new Error(e); 
    }
}