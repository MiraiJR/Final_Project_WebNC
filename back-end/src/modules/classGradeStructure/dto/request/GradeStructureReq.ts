import { IsNotEmpty } from "class-validator";

export class GradeStructureReqDTO {
    @IsNotEmpty({message: "Class ID is required"})
    classID: string;
}