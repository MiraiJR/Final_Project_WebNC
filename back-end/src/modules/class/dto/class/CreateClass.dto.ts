import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateClassDto{
    @IsNotEmpty({ message: 'Title cannot be empty' }) 
    title: string;
    @IsOptional()
    description: string;
}