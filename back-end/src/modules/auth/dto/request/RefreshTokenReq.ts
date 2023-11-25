import { IsNotEmpty } from 'class-validator';

export class RefreshTokenReqDTO {
  @IsNotEmpty({ message: 'Token cannot be null' })
  token: string;
}
