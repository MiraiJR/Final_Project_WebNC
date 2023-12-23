import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminAccountEntity } from './admin-auth.entity';

@Injectable()
export class AdminAccountRepository extends Repository<AdminAccountEntity> {
  constructor(
    @InjectRepository(AdminAccountEntity)
    repository: Repository<AdminAccountEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByUsername(username: string): Promise<AdminAccountEntity> {
    return this.findOne({
      where: {
        username,
      },
    });
  }

  async findById(id: number): Promise<AdminAccountEntity> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async findByAccessToken(token: string): Promise<AdminAccountEntity> {
    return this.findOne({
      where: {
        accessToken: token,
      },
    });
  }

  async findByRefreshToken(token: string): Promise<AdminAccountEntity> {
    return this.findOne({
      where: {
        refreshToken: token,
      },
    });
  }
}
