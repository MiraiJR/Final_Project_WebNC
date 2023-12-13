import { Injectable, NotFoundException } from '@nestjs/common';
import { GradeRepository } from './grade.repository';
import { ClassService } from '../class/class.service';
import { GradeStructure } from '../grade-structure/grade-structure.entity';
import { GradeStructureRepository } from '../grade-structure/grade-structure.repository';
import { StudentRepository } from '../student/student.repository';

@Injectable()
export class GradeService {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private readonly classService: ClassService,
    private readonly studentRepository: StudentRepository,
    private readonly gradeStructureRepository: GradeStructureRepository,
  ) {}

  async insertListGradeStudent(classId: string, gradeStudents: GradeStudent[]) {
    const matchedClass = await this.classService.findByIdCode(classId);

    if (!matchedClass) {
      throw new NotFoundException('Class not found!');
    }

    const gradeStructures = await this.gradeStructureRepository.findByClassId(
      classId,
    );

    gradeStudents.forEach(async (gradeStudent) => {
      await this.insertFromGradeStudentCsv(gradeStructures, gradeStudent);
    });
  }

  async insertFromGradeStudentCsv(
    gradeStructures: GradeStructure[],
    gradeStudent: GradeStudent,
  ) {
    const matchedStudent = await this.studentRepository.findById(
      gradeStudent.studentId,
    );

    gradeStudent.scores.forEach(async (score, _index) => {
      const gradeStructureId = gradeStructures[_index].id;
      const existedGradeStudent = await this.findByGradeStructureAndStudentId(
        matchedStudent.id,
        gradeStructureId,
      );

      if (existedGradeStudent) {
        await this.gradeRepository.save({
          ...existedGradeStudent,
          score,
          gradeStructureId,
          studentId: matchedStudent.id,
        });
      } else {
        await this.gradeRepository.save({
          score,
          gradeStructureId,
          studentId: matchedStudent.id,
        });
      }
    });
  }

  async findByGradeStructureAndStudentId(
    studentId: string,
    gradeStructureId: number,
  ) {
    return this.gradeRepository.findOne({
      where: {
        studentId,
        gradeStructureId,
      },
    });
  }
}
