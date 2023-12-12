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
}
