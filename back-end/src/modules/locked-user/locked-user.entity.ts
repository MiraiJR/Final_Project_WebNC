import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('locked-users')
export class LockedUserEntity {
  @OneToOne(() => User, {
    eager: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  user: User;

  @PrimaryColumn()
  userId: number;

  @CreateDateColumn({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  lockedAt: Date;

  @Column({ nullable: false })
  duration: number;
}
