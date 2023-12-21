import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LockedUserEntity } from './locked-user.entity';

@Injectable()
export class LockedUserRepository extends Repository<LockedUserEntity> {
  constructor(
    @InjectRepository(LockedUserEntity)
    repository: Repository<LockedUserEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findByUserId(userId: number): Promise<LockedUserEntity> {
    return this.findOne({
      where: {
        userId,
      },
    });
  }
}
