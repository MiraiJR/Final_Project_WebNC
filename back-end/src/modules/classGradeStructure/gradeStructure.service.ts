import { ConfigService } from "@nestjs/config";
import { GradeStructureRepository } from "./gradeStructure.repository";
import { Assignment } from "src/shared/types/Assignment";
import { GradeStructure } from "./gradeStructure.entity";
import { Injectable } from "@nestjs/common";
import { GradeStructureRespDTO } from "./dto/response/GradeStructureResp";
@Injectable()
export class GradeStructureService {
    constructor (
        private readonly gradeStructureRepository: GradeStructureRepository,
        private readonly configService: ConfigService,
    ) {}

    async getGradeStructureByClassId(classId: string): Promise<GradeStructureRespDTO> {
        try {
            const gradeStructure = await this.gradeStructureRepository.findByClassId(classId);

            if (!gradeStructure || gradeStructure.length === 0) {
                return null;
            }
            const rs: GradeStructureRespDTO = {
                assignments: 
                    gradeStructure.map(assignment => {
                        const {id, nameAssignment, percentScore} = assignment;
                        return {id, nameAssignment, percentScore}
                    })
            }
            return rs;
        } catch (error) {
            // Log the error or handle it appropriately
            console.error(`Error fetching grade structure: ${error.message}`);
            throw new Error('Failed to fetch grade structure'); 
        }   
    }

    async updateGradeStructure(classId: string,gradeStructure:GradeStructureRespDTO ): Promise<void> {
        try {
            await this.gradeStructureRepository.updateGradeStructure(classId,gradeStructure);
        } catch (error) {
            throw new Error(`Error updating grade structure: ${error.message}`);    
        }
    }
    
}
 
