import { IsEmail, IsNotEmpty, Length } from 'class-validator';
export class LoginReqDTO {
  @IsNotEmpty({ message: 'Email cannot be empty!' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(8, 256, { message: 'Password has 8 characters at least' })
  password: string;
}
