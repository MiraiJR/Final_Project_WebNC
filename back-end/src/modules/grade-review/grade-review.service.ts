import { ConfigService } from "@nestjs/config";
import { GradeReviewRepository } from "./grade-review.repository";
import { Assignment } from "src/shared/types/Assignment";
import { GradeReview } from "./grade-review.entity";
import { Injectable } from "@nestjs/common";
import { GradeReviewRespDTO } from "./dto/response/gradeReviewResp.dto";
import { GradeStructureService } from "../grade-structure/grade-structure.service";
@Injectable()
export class GradeReviewService {
    constructor (
        private readonly gradeReviewRepository: GradeReviewRepository,
        private readonly gradeStructureService: GradeStructureService,
        private readonly configService: ConfigService,
    ) {}

    async getGradeReviewByClassId(classIdCode: string): Promise<GradeReviewRespDTO[]> {
        try {
            const gradeReviews = await this.gradeReviewRepository.findByClassId(classIdCode);

            if (!gradeReviews || gradeReviews.length === 0) {
                return [];
            }
            const rs = Promise.all(gradeReviews.map( async  (gradeReview )=> {
                const { id,structureId, studentId, expectPercentScore, explain } = gradeReview;
                const assignment = await this.gradeStructureService.getGradeAssignment(classIdCode, structureId);
                const {nameAssignment, percentScore} = assignment;
                //get name from table grade
                const studentName = "example name";
                const rs: GradeReviewRespDTO = { id,structureId, studentName, nameAssignment, currPercentScore: percentScore, expectPercentScore, explain };
                return rs;
            }));
            return rs; 
        } catch (error) {
            // Log the error or handle it appropriately
            console.error(`Error fetching grade review: ${error.message}`);
            throw new Error('Failed to fetch grade review'); 
        }   
    }
    
}

