import { ConfigService } from "@nestjs/config";
import { GradeReviewRepository } from "./grade-review.repository";
import { Assignment } from "src/shared/types/Assignment";
import { GradeReview } from "./grade-review.entity";
import { Injectable } from "@nestjs/common";
import { GradeReviewRespDTO } from "./dto/response/gradeReviewResp.dto";
@Injectable()
export class GradeReviewService {
    constructor (
        private readonly gradeReviewRepository: GradeReviewRepository,
        private readonly configService: ConfigService,
    ) {}

    async getGradeReviewByClassId(classIdCode: string): Promise<GradeReviewRespDTO[]> {
        try {
            const gradeReviews = await this.gradeReviewRepository.findByClassId(classIdCode);

            if (!gradeReviews || gradeReviews.length === 0) {
                return [];
            }
            const rs:GradeReviewRespDTO[] = gradeReviews.map(  (gradeReview )=> {
                const { id,structureId, studentId, nameAssignment, currPercentScore, expectPercentScore, explain } = gradeReview;
                const studentName = "example name";
                const rs: GradeReviewRespDTO = { id,structureId, studentName, nameAssignment, currPercentScore, expectPercentScore, explain };
                return rs;
            });
            return rs; 
        } catch (error) {
            // Log the error or handle it appropriately
            console.error(`Error fetching grade review: ${error.message}`);
            throw new Error('Failed to fetch grade review'); 
        }   
    }
    
}

