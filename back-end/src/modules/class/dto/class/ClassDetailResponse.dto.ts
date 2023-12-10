import { UserRole } from "src/shared/types/EnumUserRole";

export class ClassDetailResponseDto{
    title: string;
    creatorId: number;
    idCode: string;
    roleToken: string;
    role: UserRole;
    description: string;
}