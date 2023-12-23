import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassRepository extends Repository<Class> {
  constructor(
    @InjectRepository(Class)
    repository: Repository<Class>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(): Promise<Class[]> {
    return await this.find({
      relations: ['creator'],
    });
  }

  async findClassByIdCode(idCode: string) : Promise<Class>{
    return await this.findOne({
      where: {
          idCode,
        },
        relations:
          ['creator']
    })
  }

  async updateClassState(idCode: string, isActive: boolean) : Promise<void>{

    const _class = await this.findClassByIdCode(idCode);
    const a = await this.save({
      ..._class,
      isActive
    })

  }
}