import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UnlockUserReqDto {
  @IsNotEmpty({ message: 'User id cannot be null!' })
  @IsNumber()
  userId: number;
}
