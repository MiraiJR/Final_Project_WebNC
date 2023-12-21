import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class LockUserReqDto {
  @IsNotEmpty({ message: 'User id cannot be null!' })
  @IsNumber()
  userId: number;

  @IsNotEmpty({ message: 'User id cannot be null!' })
  @IsNumber()
  @IsPositive()
  duration: number;
}
