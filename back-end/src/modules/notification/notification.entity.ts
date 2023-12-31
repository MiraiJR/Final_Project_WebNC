import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { NotificationType } from "src/shared/types/EnumNotificationType";
import { Class } from "../class/class.entity";
import { GradeEntity } from "../grade/grade.entity";
import { GradeReviewComment } from "../grade-review-comment/grade-review-comment.entity";
import { GradeStructure } from "../grade-structure/grade-structure.entity";
import { GradeReview } from "../grade-review/grade-review.entity";


@Entity()
export class NotificationEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { eager: true }) 
    @JoinColumn({ name: 'senderId' })
    sender: User;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'receiverId' })
    receiver: User;

    @Column()
    notificationType: NotificationType;

    @Column({ default: false })
    isRead: boolean;

    @ManyToOne(()=>Class,{eager:true, nullable:true})
    @JoinColumn({name: 'classIdCode'})
    class : Class;

    @ManyToOne(()=>GradeEntity,{eager:true, nullable:true})
    @JoinColumn({name: 'structureId'})
    grade: GradeStructure;

    @ManyToOne (()=>GradeReview,{eager:true,nullable:true})
    @JoinColumn({name:"reviewId"})
    review: GradeReview;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}