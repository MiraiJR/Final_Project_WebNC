import { IsNotEmpty } from "class-validator";

export class CreateClassDto{
    @IsNotEmpty({ message: 'Title cannot be empty' }) 
    title: string;
}