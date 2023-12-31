import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from '../class/class.entity';
@Entity('grade-structures')
export class GradeStructure {
  @ManyToOne(() => Class, { lazy: true, nullable: false })
  @JoinTable()
  class: Class;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'classIdCode' })
  classId: string;

  @Column({ nullable: false })
  nameAssignment: string;

  @Column({ nullable: true })
  percentScore: number;

  @Column({ nullable: true })
  position: number;
}
