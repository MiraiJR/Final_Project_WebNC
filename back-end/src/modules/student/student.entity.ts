import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';
import { Class } from '../class/class.entity';

@Entity('students')
export class StudentEntity {
  @ManyToOne(() => Class, { lazy: true, nullable: false, onDelete: 'CASCADE' })
  @JoinTable()
  class: Class;

  @Column({ name: 'classIdCode' })
  classId: string;

  @PrimaryColumn({ nullable: false })
  id: string;

  @Column({ nullable: false })
  fullname: string;
}
