import { IsNotEmpty } from 'class-validator';

export class RegisterWithSocialAccountReqDTO {
  @IsNotEmpty({ message: 'Social ID cannot be empty' })
  socialId: string;
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;
  verifyEmail: boolean;
  fullname: string;
}
