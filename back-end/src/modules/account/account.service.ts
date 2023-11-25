import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { AccountRespDTO } from './dto/response/AccountResp';
import { Account } from './account.entity';
import { UserService } from '../user/user.service';
import { IAccount } from './account.interface';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async findAccountByUsername(username: string): Promise<Account | null> {
    const account = await this.accountRepository.findOne({
      where: {
        username,
      },
    });

    return account ?? null;
  }

  async createAccount(newAccount: IAccount) {
    return this.accountRepository.save(newAccount);
  }

  async updateAccount(newAccount: IAccount) {
    return this.accountRepository.save(newAccount);
  }
}
