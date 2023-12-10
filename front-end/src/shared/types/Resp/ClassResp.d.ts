import { UserRole } from "../UserRole";

type ClassRespData = {
    title: string;
    creator: {
        id: number,
        fullname: string,
        email: string,
    };
    idCode: string;
    role: UserRole;
    description: string;
}

type ClassDetailResp = {
    title: string;
    creatorId: number;
    idCode: string;
    roleToken: string;
    description: string;
    role: UserRole
}

type ClassMemberResp = {
    email: string;
    fullname: string;
    id: number;
    studentId: string;
}

type ClassMembersListResp = {
    students: ClassMemberResp[];
    teachers: ClassMemberResp[];
}