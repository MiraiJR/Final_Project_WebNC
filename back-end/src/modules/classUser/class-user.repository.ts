import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { ClassUser } from './class-user.entity';

@Injectable()
export class ClassUserRepository extends Repository<ClassUser> {
  constructor(
    @InjectRepository(ClassUser)
    repository: Repository<ClassUser>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}