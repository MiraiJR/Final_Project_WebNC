import { Injectable, NotFoundException } from '@nestjs/common';
import { GradeRepository } from './grade.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { GradeStructureService } from '../grade-structure/grade-structure.service';
import { ClassService } from '../class/class.service';
import { GradeStructure } from '../grade-structure/grade-structure.entity';

@Injectable()
export class GradeService {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly gradeStructoreService: GradeStructureService,
    private readonly classService: ClassService,
  ) {}

  async insertListGradeStudent(classId: string, gradeStudents: GradeStudent[]) {
    const matchedClass = await this.classService.findByIdCode(classId);

    if (!matchedClass) {
      throw new NotFoundException('Class not found!');
    }

    const gradeStructures = await this.gradeStructoreService.findByClass(
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
    const matchedStudent = await this.userService.findByStudentId(
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
    userId: number,
    gradeStructureId: number,
  ) {
    return this.gradeRepository.findOne({
      where: {
        studentId: userId,
        gradeStructureId,
      },
    });
  }
}
