import { Controller , UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/AuthGuard";
import { GradeReviewService } from "./grade-review.service";

@Controller()
@UseGuards(AuthGuard)
export class GradeReviewController {
    constructor(
        private readonly gradeReviewService: GradeReviewService,
        ) {}
}