import { Injectable } from '@nestjs/common';
import { GradeStructure } from './gradeStructure.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GradeStructureRepository {
    constructor(
        @InjectRepository(GradeStructure)
        private readonly repository: Repository<GradeStructure>, 
    ) {}

    async findByClassId(classId: string): Promise<GradeStructure[]> {
        return await this.repository.find({
            where: { classId: classId },
        });
    }

    async updateGradeStructure(classId: string,gradeStructure:GradeStructure[] ): Promise<void> {
        // loop through grade structure and update each one assignment
        for (let i = 0; i < gradeStructure.length; i++) {
            const assignment = gradeStructure[i];
            await this.repository.save(assignment);
        }
    }
}
