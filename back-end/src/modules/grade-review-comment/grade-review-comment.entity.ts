import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GradeReview } from "../grade-review/grade-review.entity";
import { User } from "../user/user.entity";

@Entity('grade-review-comment')
export class GradeReviewComment{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> GradeReview, {eager:true, nullable:false})
    @JoinColumn({name: 'reviewId'})
    review: GradeReview;

    @ManyToOne(()=>User,{eager: true,nullable:false})
    @JoinColumn({name: 'userId'})
    user: User;

    @Column({nullable:false})
    content: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}