import { BeforeInsert, Column, CreateDateColumn, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../user/user.entity";


@Entity('class')
export class Class{
    @PrimaryGeneratedColumn('uuid')
    idCode : string

    @Column({nullable:false})
    title:string;

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(()=>User,{nullable:false,cascade: true })
    @JoinColumn()
    creator: User;

    @BeforeInsert()
    generateId() {
        this.idCode = uuidv4();
    }
}