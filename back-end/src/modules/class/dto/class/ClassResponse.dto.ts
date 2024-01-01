import { User } from "src/modules/user/user.entity";
import { UserRole } from "src/shared/types/EnumUserRole";

export class ClassResponseDto{
    title: string;
    creator: {
        id : number,
        fullname : string,
        email: string,
    };
    idCode: string;
    role: UserRole;
    description: string;
    isActive: boolean;
}