import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  fullname: string;

  @OneToOne(() => Account, (account) => account.username)
  @JoinColumn({ name: 'account_pk' })
  account: Account;
}
