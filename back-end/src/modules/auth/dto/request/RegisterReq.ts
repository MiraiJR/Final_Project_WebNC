import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterReqDTO {
  @IsNotEmpty({ message: 'Username cannot be empty!' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(8, 255, { message: 'Password has 8 characters at least' })
  password: string;

  @IsNotEmpty({ message: 'Fullname cannot be empty' })
  @Length(3, 255, { message: 'Fullname has 8 characters at least' })
  fullname: string;
}
