import { Module, forwardRef } from '@nestjs/common';
import { GradeReviewService } from './grade-review.service';
import { GradeReviewController } from './grade-review.controller';
import { GradeReviewRepository } from './grade-review.repository';
import { ClassModule } from '../class/class.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeReview } from './grade-review.entity';

@Module({
    imports: [TypeOrmModule.forFeature([GradeReview, GradeReviewRepository]),forwardRef(()=> ClassModule),],
    providers: [GradeReviewService , GradeReviewRepository ],
    controllers: [GradeReviewController],
    exports: [GradeReviewService], 
}) 
export class GradeReviewModule {} 
