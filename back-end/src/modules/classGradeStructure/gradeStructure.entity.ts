import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "../class/class.entity";
@Entity('class_grade_structure')
export class GradeStructure{
    // @ManyToOne(()=>Class,{eager: true, nullable:false})
    // @JoinColumn({name: 'classId'})
    // classroom : Class

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    classId: string;

    @Column({ nullable: false })
    nameAssignment : string;

    @Column({ nullable: true })
    percentScore: number;
}