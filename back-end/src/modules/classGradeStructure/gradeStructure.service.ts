import { ConfigService } from "@nestjs/config";
import { GradeStructureRepository } from "./gradeStructure.repository";
import { Assignment } from "src/shared/types/Assignment";
import { GradeStructure } from "./gradeStructure.entity";
export class GradeStructureService {
    constructor (
        private gradeStructureRepository: GradeStructureRepository,
        private configService: ConfigService,
    ) {}

    async getGradeStructureByClassId(classId: string): Promise<GradeStructure[]> {
        const gradeStructure = await this.gradeStructureRepository.findByClassId(classId);
        if (!gradeStructure || gradeStructure.length === 0) {
            return [];
        }
        return gradeStructure;
    }
}

