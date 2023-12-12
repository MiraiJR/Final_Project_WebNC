import { Injectable } from '@nestjs/common';
import { GradeStructure } from './gradeStructure.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeStructureRespDTO } from './dto/response/GradeStructureResp';

@Injectable()
export class GradeStructureRepository {
  constructor(
    @InjectRepository(GradeStructure)
    private readonly repository: Repository<GradeStructure>,
  ) {}

  async findByClassId(classId: string): Promise<GradeStructure[]> {
    return await this.repository.find({
      where: { classId },
    });
  }

  async updateGradeStructure(
    classId: string,
    gradeStructure: GradeStructureRespDTO,
  ): Promise<void> {
    const oldAssignments = await this.findByClassId(classId);
    // delete assignment do not have id in the gradeStructure.assignments
    for (let i = 0; i < oldAssignments.length; i++) {
      const assignment = oldAssignments[i];
      const index = gradeStructure.assignments.findIndex(
        (a) => a.id === assignment.id,
      );
      if (index === -1) {
        // await this.repository.delete(assignment);
      }
    }
    // loop through grade structure and update each one assignment
    for (let i = 0; i < gradeStructure.assignments.length; i++) {
      const assignment = gradeStructure.assignments[i];
      // update assignment
      const rs: GradeStructure = {
        classId: classId,
        id: assignment.id,
        nameAssignment: assignment.nameAssignment,
        percentScore: assignment.percentScore,
      };
      await this.repository.save(rs);
    }
  }
}
