import { UserRole } from "src/shared/types/EnumUserRole";

export class ClassResponseDto{
    title: string;
    creatorId: number;
    idCode: string;
    role: UserRole;
}