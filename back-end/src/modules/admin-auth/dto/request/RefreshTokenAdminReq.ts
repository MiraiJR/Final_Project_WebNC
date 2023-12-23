import { IsNotEmpty } from 'class-validator';

export class RefreshTokenAdminReqDto {
  @IsNotEmpty()
  token: string;
}
