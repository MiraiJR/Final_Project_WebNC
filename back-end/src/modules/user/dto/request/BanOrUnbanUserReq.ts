import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class BanOrUnbanUserReqDto {
  @IsNotEmpty({ message: 'User id cannot be null!' })
  @IsNumber()
  userId: number;

  @IsNotEmpty({ message: 'IsBanned id cannot be null!' })
  @IsBoolean()
  isBan: boolean;
}
