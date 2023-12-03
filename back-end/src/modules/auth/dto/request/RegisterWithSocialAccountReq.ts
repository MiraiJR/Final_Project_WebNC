import { IsNotEmpty } from 'class-validator';

export class RegisterWithSocialAccountReqDTO {
  @IsNotEmpty({ message: 'Social ID cannot be empty' })
  socialId: string;
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;
  @IsNotEmpty({ message: 'state of email cannot be empty' })
  verifyEmail: boolean;
  @IsNotEmpty({ message: 'Fullname cannot be empty' })
  fullname: string;
}
