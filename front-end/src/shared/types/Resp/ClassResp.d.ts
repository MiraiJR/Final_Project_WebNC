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
}