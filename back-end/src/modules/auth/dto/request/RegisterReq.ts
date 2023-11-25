import { IsNotEmpty, Length } from 'class-validator';

export class RegisterReqDTO {
  @IsNotEmpty({ message: 'Username cannot be empty!' })
  @Length(4, 255, { message: 'Username has 4 characters at least' })
  username: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(8, 255, { message: 'Password has 8 characters at least' })
  password: string;
}
