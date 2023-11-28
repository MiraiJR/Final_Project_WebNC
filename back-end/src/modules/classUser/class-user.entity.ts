import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserRole } from "src/shared/types/EnumUserRole";
import { Class } from "../class/class.entity";
import { User } from "../user/user.entity";

@Entity('class_user')
export class ClassUser{

    @ManyToOne(()=>Class,{eager: true, nullable:false})
    @JoinColumn({name: 'classId'})
    classroom : Class

    @ManyToOne(()=>User, {eager: true, nullable:false})
    @JoinColumn({name: 'userId'})
    user : User

    @Column({default : UserRole.HS})
    role : UserRole

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    classId: string;
}