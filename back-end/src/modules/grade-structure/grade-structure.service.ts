import { Injectable } from '@nestjs/common';
import { GradeStructureRepository } from './grade-structure.repository';
import { GradeStructure } from './grade-structure.entity';

@Injectable()
export class GradeStructureService {
  constructor(
    private readonly gradeStructureRepository: GradeStructureRepository,
  ) {}

  async findByClass(classId: string): Promise<GradeStructure[]> {
    const gradeStructures = await this.gradeStructureRepository.find({
      where: {
        classId,
      },
      order: {
        id: 'asc',
      },
    });

    return gradeStructures;
  }
}
