import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { GradeStructure } from '../grade-structure/grade-structure.entity';
import { Class } from '../class/class.entity';

@Entity('grade-reviews')
export class GradeReview {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Class, { lazy: true, nullable: false })
    @JoinTable()
    class: Class;

    @ManyToOne(() => GradeStructure, { lazy: true, nullable: false })
    @JoinTable()
    structure: GradeStructure;

    @ManyToOne(() => User, { lazy: true, nullable: false })
    @JoinTable()
    student: User;

    @Column({ name: 'classIdCode' })
    classId: string;
    
    @Column({ name: 'structureId' })
    structureId: string;

    @Column({ name: 'studentId' })
    studentId: string;

    @Column({ nullable: false })
    nameAssignment: string;

    @Column({ nullable: false })
    currPercentScore: number;

    @Column({ nullable: false })
    expectPercentScore: number;

    @Column({ nullable: true })
    explain: string;
}
