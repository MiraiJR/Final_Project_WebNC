import { IsNotEmpty } from 'class-validator';

export class IsHaveAccountReqDTO {
  @IsNotEmpty({ message: 'Social ID cannot be empty' })
  socialId: string;
}
