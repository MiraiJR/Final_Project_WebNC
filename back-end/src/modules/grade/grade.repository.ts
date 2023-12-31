import { Repository } from 'typeorm';
import { GradeEntity } from './grade.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GradeRepository extends Repository<GradeEntity> {
  constructor(
    @InjectRepository(GradeEntity)
    repository: Repository<GradeEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByGradeStructureAndStudentId(
    studentId: string,
    gradeStructureId: number,
  ): Promise<GradeEntity> {
    return this.findOne({
      where: {
        studentId,
        gradeStructureId,
      },
    });
  }

  async findGradeStudentsByClassIdAndGradeStructureId(
    classId: string,
    gradeStructureId: number,
  ): Promise<GradeEntity[]> {
    const gradeStudents = await this.find({
      where: {
        student: {
          classId,
        },
        gradeStructureId,
      },
      order: {
        studentId: 'asc',
      },
    });

    return gradeStudents;
  }

  async updateIsFinalizedByGradeStructureId(
    gradeStructureId: number,
    isFinalized: boolean,
  ) {
    return await this.update({ gradeStructureId }, { isFinalized });
  }

  async updateSoreForStudentByGradeStructureId(
    studentId: string,
    gradeStructureId: number,
    score: number,
  ) {
    return await this.update(
      {
        studentId,
        gradeStructureId,
      },
      {
        score,
      },
    );
  }

  async findGradeByStudentIdInClassId(
    classId: string,
    studentId: string,
  ): Promise<GradeEntity[]> {
    return this.find({
      where: {
        studentId,
        gradeStructure: {
          classId,
        },
      },
      order: {
        gradeStructure: {
          position: 'asc',
        },
      },
    });
  }
}
