import { IsNotEmpty } from 'class-validator';

export class LoginSocialReqDTO {
  @IsNotEmpty({ message: 'Social ID cannot be empty' })
  socialId: string;
}
