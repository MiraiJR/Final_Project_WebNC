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
}
