import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthAdminReqDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
