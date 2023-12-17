import { IsNotEmpty } from 'class-validator';

export class ClassIdDto {
  @IsNotEmpty()
  classId: string;
}
