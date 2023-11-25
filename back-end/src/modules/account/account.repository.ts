import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(
    @InjectRepository(Account)
    repository: Repository<Account>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
