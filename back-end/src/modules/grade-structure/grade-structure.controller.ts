import { Controller , UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/AuthGuard";
import { GradeStructureService } from "./grade-structure.service";

@Controller()
@UseGuards(AuthGuard)
export class GradeStructureController {
    constructor(
        private readonly gradeStructureService: GradeStructureService,
        ) {}
}