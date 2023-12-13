import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';

@Injectable()
export class StudentRepository extends Repository<StudentEntity> {
  constructor(
    @InjectRepository(StudentEntity)
    repository: Repository<StudentEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async insertStudent(
    student: Student,
    classId: string,
  ): Promise<StudentEntity> {
    return this.save({
      classId,
      ...student,
    });
  }

  async findById(id: string): Promise<StudentEntity> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
