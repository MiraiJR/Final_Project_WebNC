import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    PrimaryColumn,
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
    @JoinColumn({name: 'classIdCode'})
    class: Class;

    @ManyToOne(() => GradeStructure, { lazy: true, nullable: false })
    @JoinColumn({name: 'structureId'})
    structure: GradeStructure;

    @ManyToOne(() => User, { lazy: true, nullable: false })
    @JoinColumn({name: 'studentId'})
    student: User;

    @Column()
    classIdCode: string;
    
    @Column() 
    structureId: number;

    @Column()
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
