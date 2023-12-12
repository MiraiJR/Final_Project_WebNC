import { IsEmail, IsNotEmpty, ArrayNotEmpty } from "class-validator";
import { UserRole } from "src/shared/types/EnumUserRole";

export class InviteMailReqDto{
    @ArrayNotEmpty({ message: 'Email list cannot be empty' })
    @IsNotEmpty({ each: true, message: 'Each email must not be empty' })
    @IsEmail({}, { each: true, message: 'Each item must be a valid email address' })
    emails: string[];
    @IsNotEmpty({message: 'Role cannot be empty'})
    role: UserRole;
}