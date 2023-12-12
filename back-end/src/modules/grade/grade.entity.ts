import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true, nullable: false })
  @JoinColumn({ name: 'student_id' })
  studentId: string;

  @Column({ default: false, name: 'is_finalized' })
  isFinalized: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  score: number;
}
