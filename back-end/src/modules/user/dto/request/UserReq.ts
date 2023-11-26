import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserReqDTO {
  @IsNotEmpty({ message: 'Fullname cannot be empty!' })
  @Length(4, 255, { message: 'Fullname has 4 characters at least' })
  fullname: string;
}
