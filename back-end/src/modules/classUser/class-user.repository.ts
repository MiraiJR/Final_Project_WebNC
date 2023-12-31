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

  async findUserByClassId(classId: string) : Promise<ClassUser[]>{
    return await this.find({
      where: { classId: classId },
      relations: ['user'],
    });
  }

  async findClassesByUserId(userId: number): Promise<ClassUser[]>{
   return await this.find({
      where: { userId },
      relations: ['classroom', 'classroom.creator'],
  });
  }
}