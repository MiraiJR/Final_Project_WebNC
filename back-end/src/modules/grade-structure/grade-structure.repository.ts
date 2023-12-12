import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeStructure } from './grade-structure.entity';

@Injectable()
export class GradeStructureRepository extends Repository<GradeStructure> {
  constructor(
    @InjectRepository(GradeStructure)
    repository: Repository<GradeStructure>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
