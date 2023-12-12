import { ConfigService } from "@nestjs/config";
import { GradeStructureRepository } from "./gradeStructure.repository";
import { Assignment } from "src/shared/types/Assignment";
import { GradeStructure } from "./gradeStructure.entity";
import { Injectable } from "@nestjs/common";
@Injectable()
export class GradeStructureService {
    constructor (
        private readonly gradeStructureRepository: GradeStructureRepository,
        private readonly configService: ConfigService,
    ) {}

    async getGradeStructureByClassId(classId: string): Promise<GradeStructure[]> {
        try {
            const gradeStructure = await this.gradeStructureRepository.findByClassId(classId);

            if (!gradeStructure || gradeStructure.length === 0) {
                return [];
            }
            return gradeStructure;
        } catch (error) {
            // Log the error or handle it appropriately
            console.error(`Error fetching grade structure: ${error.message}`);
            throw new Error('Failed to fetch grade structure'); 
        }   
    }

    async updateGradeStructure(classId: string,gradeStructure:GradeStructure[] ) {
        try {
            await this.gradeStructureRepository.updateGradeStructure(classId,gradeStructure);
        } catch (error) {
            throw new Error(`Error updating grade structure: ${error.message}`);    
        }
    }
    
}

