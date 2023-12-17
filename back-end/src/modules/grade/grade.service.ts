import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GradeRepository } from './grade.repository';
import { ClassService } from '../class/class.service';
import { GradeStructure } from '../grade-structure/grade-structure.entity';
import { GradeStructureRepository } from '../grade-structure/grade-structure.repository';
import { StudentRepository } from '../student/student.repository';
import { StudentService } from '../student/student.service';
import { UserService } from '../user/user.service';

@Injectable()
export class GradeService {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private readonly classService: ClassService,
    private readonly studentRepository: StudentRepository,
    private readonly gradeStructureRepository: GradeStructureRepository,
    private readonly studentService: StudentService,
    private readonly userService: UserService,
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
      const existedGradeStudent =
        await this.gradeRepository.findByGradeStructureAndStudentId(
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

  async getGradeStudentsOfClass(classId: string): Promise<GradeStudentResp[]> {
    const studentsInClass = await this.studentRepository.findStudentsOfClassId(
      classId,
    );
    const gradeStructuresOfClasss =
      await this.gradeStructureRepository.findByClassId(classId);
    const results: GradeStudentResp[] = [];

    for (const student of studentsInClass) {
      const gradeStudent: GradeStudentResp = {
        studentId: student.id,
        fullname: student.fullname,
        scores: [],
      };

      for (const gradeStruture of gradeStructuresOfClasss) {
        const grade =
          await this.gradeRepository.findByGradeStructureAndStudentId(
            student.id,
            gradeStruture.id,
          );

        if (grade) {
          gradeStudent.scores.push({
            value: grade.score,
            isFinalized: grade.isFinalized,
          });
        } else {
          gradeStudent.scores.push({
            value: 0,
            isFinalized: false,
          });
        }
      }

      results.push(gradeStudent);
    }

    return results;
  }

  async updateScoreForStudentInGradeStructure(
    studentId: string,
    gradeStructureId: number,
    newScore: number,
  ): Promise<void> {
    this.studentService.checkExistedStudent(studentId);

    const gradeStudentToUpdate =
      await this.gradeRepository.findByGradeStructureAndStudentId(
        studentId,
        gradeStructureId,
      );

    if (!gradeStudentToUpdate) {
      await this.gradeRepository.save({
        studentId,
        gradeStructureId,
        score: newScore,
      });
      return;
    }

    await this.gradeRepository.save({
      ...gradeStudentToUpdate,
      score: newScore,
    });
  }

  async updateStatusGradeForStudent(
    studentId: string,
    gradeStructureId: number,
    isFinalized: boolean,
  ): Promise<void> {
    this.studentService.checkExistedStudent(studentId);

    const gradeStudentToUpdate =
      await this.gradeRepository.findByGradeStructureAndStudentId(
        studentId,
        gradeStructureId,
      );

    if (!gradeStudentToUpdate) {
      await this.gradeRepository.save({
        studentId,
        gradeStructureId,
        isFinalized,
      });
      return;
    }

    await this.gradeRepository.save({
      ...gradeStudentToUpdate,
      isFinalized,
    });
  }

  async updateStatusGradeForAllStudents(
    gradeStructureId: number,
    isFinalized: boolean,
  ): Promise<void> {
    const matchedGradeStructure = await this.gradeStructureRepository.findById(
      gradeStructureId,
    );

    if (!matchedGradeStructure) {
      throw new NotFoundException(
        `Grade structure with id [${gradeStructureId}] not found!`,
      );
    }

    await this.gradeRepository.updateIsFinalizedByGradeStructureId(
      gradeStructureId,
      isFinalized,
    );
  }

  async updateGradeForSpecificAssignment(
    gradeStructureId: number,
    gradeStudents: GradeStudentInAssignment[],
  ) {
    for (const gradeStudent of gradeStudents) {
      await this.studentService.checkExistedStudent(gradeStudent.studentId);
      await this.gradeRepository.updateSoreForStudentByGradeStructureId(
        gradeStudent.studentId,
        gradeStructureId,
        gradeStudent.score,
      );
    }
  }

  async getFinalizedGradeOfAssignmentsOfUser(
    userId: number,
  ): Promise<number[]> {
    const matchedUser = await this.userService.findById(userId);

    if (!matchedUser.studentId) {
      throw new BadRequestException('User without studentId!');
    }

    const gradeStudent = await this.gradeRepository.findGradeByStudentId(
      matchedUser.studentId,
    );
    const grades: number[] = [];

    gradeStudent.forEach((gradeStudentEle) => {
      if (gradeStudentEle.isFinalized) {
        grades.push(gradeStudentEle.score);
      } else {
        grades.push(0);
      }
    });

    return grades;
  }

  async getGradeOfAssignment(studentId: string, gradeStructureId: number){
    const gradeStudent = await this.gradeRepository.findByGradeStructureAndStudentId(
      studentId,
      gradeStructureId,
    );

    if (!gradeStudent) {
      throw new NotFoundException(
        `Grade of student [${studentId}] in grade structure [${gradeStructureId}] not found!`,
      );
    }

    return gradeStudent;
  }
}
