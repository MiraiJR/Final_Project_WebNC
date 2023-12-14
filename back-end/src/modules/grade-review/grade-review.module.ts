import { Module, forwardRef } from '@nestjs/common';
import { GradeReviewService } from './grade-review.service';
import { GradeReviewController } from './grade-review.controller';
import { GradeReviewRepository } from './grade-review.repository';
import { ClassModule } from '../class/class.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeReview } from './grade-review.entity';
import { GradeStructureModule } from '../grade-structure/grade-structure.module';

@Module({
    imports: [TypeOrmModule.forFeature([GradeReview, GradeReviewRepository]),forwardRef(()=> ClassModule),forwardRef(()=> GradeStructureModule)],
    providers: [GradeReviewService , GradeReviewRepository ],
    controllers: [GradeReviewController],
    exports: [GradeReviewService], 
}) 
export class GradeReviewModule {} 
