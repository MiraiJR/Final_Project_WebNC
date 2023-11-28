import { BeforeInsert, Column, Entity,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../user/user.entity";


@Entity('class')
export class Class{
    @PrimaryGeneratedColumn('uuid')
    idCode : string

    @Column({nullable:false})
    title:string;

    @ManyToOne(()=>User, user=>user.id,{nullable:false})
    @JoinColumn()
    creator: User;

    @BeforeInsert()
    generateId() {
        this.idCode = uuidv4();
    }
}