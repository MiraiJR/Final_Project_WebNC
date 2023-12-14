import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GradeRepository extends Repository<Grade> {
  constructor(
    @InjectRepository(Grade)
    repository: Repository<Grade>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByGradeStructureAndStudentId(
    studentId: string,
    gradeStructureId: number,
  ): Promise<Grade> {
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
  ) {
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
}
