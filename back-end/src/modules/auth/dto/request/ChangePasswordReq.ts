import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordReqDTO {
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(8, 256, { message: 'Password has 8 characters at least' })
  password: string;

  @IsNotEmpty({ message: 'Token cannot be empty' })
  token: string;
}
