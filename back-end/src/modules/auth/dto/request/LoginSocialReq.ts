import { IsEmail, IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { IsNull } from 'typeorm';

export class LoginSocialReqDTO {
  @IsNotEmpty({ message: 'Social ID cannot be empty' })
  socialId: string;
  @IsOptional()
  email: string | null;
  @IsNotEmpty({ message: 'Fullname cannot be empty' })
  fullname: string;
  @IsNotEmpty({ message: 'Social type is not empty' })
  socialType: string;
}
