import { Account } from '../account/account.entity';

export interface IUser {
  id?: number;
  email?: string;
  fullname: string;
  account: Account;
}
