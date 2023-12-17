import { Injectable } from '@nestjs/common';
import { GradeStructure } from './grade-structure.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeStructureRespDTO } from './dto/response/GradeStructureResp';
import { Class } from '../class/class.entity';

@Injectable()
export class GradeStructureRepository extends Repository<GradeStructure> {
  constructor(
    @InjectRepository(GradeStructure)
    repository: Repository<GradeStructure>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByClassId(classId: string): Promise<GradeStructure[]> {
    const gradeStructures = await this.find({
      where: {
        classId,
      },
      order: {
        position: 'asc',
      },
    });

    return gradeStructures;
  }

  async findById(id: number): Promise<GradeStructure | null> {
    const gradeStructures = await this.findOne({
      where: {
        id,
      },
      order: {
        position: 'asc',
      },
    });

    return gradeStructures;
  }

  async updateGradeStructure(
    classGradeStructure: Class,
    gradeStructure: GradeStructureRespDTO,
  ): Promise<void> {
    const oldAssignments = await this.findByClassId(classGradeStructure.idCode);
    // delete assignment do not have id in the gradeStructure.assignments
    for (let i = 0; i < oldAssignments.length; i++) {
      const assignment = oldAssignments[i];
      const index = gradeStructure.assignments.findIndex(
        (a) => a.id === assignment.id,
      );
      if (index === -1) {
        await this.delete(assignment.id);
      }
    }

   
    // loop through grade structure and update each one assignment
    for (let i = 0; i < gradeStructure.assignments.length; i++) {
      const assignment = gradeStructure.assignments[i];
      // update assignment
      const rs: GradeStructure = {
        class: classGradeStructure,
        id: assignment.id,
        classId: classGradeStructure.idCode,
        nameAssignment: assignment.nameAssignment,
        percentScore: assignment.percentScore,
        position: assignment.position,
      };
      await this.save(rs);
    }
  }

  async findAssignment(classId: string , gradeStructureId: number): Promise<GradeStructure>{
    return await this.findOne({
        where: { classId: classId, id: gradeStructureId },
        // relations: ['class'],
    });
}
}
