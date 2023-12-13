import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { ClassService } from '../class/class.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly classService: ClassService,
  ) {}

  async insertListStudent(students: Student[], classId: string): Promise<void> {
    const matchedClass = this.classService.findByIdCode(classId);
    if (!matchedClass) {
      throw new NotFoundException(`Class with id [${classId}] no found`);
    }

    students.forEach(async (student) => {
      await this.studentRepository.insertStudent(student, classId);
    });
  }
}
