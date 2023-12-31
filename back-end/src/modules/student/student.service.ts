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

  async checkExistedStudent(id: string): Promise<boolean> {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundException(`Student with StudentID [${id}] not found!`);
    }

    return true;
  }

  async getStudentName(id: string): Promise<string>{
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundException(`Student with StudentID [${id}] not found!`);
    }

    return student.fullname;
  }
}
