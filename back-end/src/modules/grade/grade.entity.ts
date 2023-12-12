import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { GradeStructure } from '../grade-structure/grade-structure.entity';

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isFinalized: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  score: number;

  @ManyToOne(() => GradeStructure, {
    eager: true,
    nullable: false,
  })
  @JoinTable()
  gradeStructure: GradeStructure;

  @ManyToOne(() => User, {
    eager: true,
    nullable: false,
  })
  @JoinTable()
  student: User;

  @Column()
  gradeStructureId: number;

  @Column()
  studentId: number;
}
