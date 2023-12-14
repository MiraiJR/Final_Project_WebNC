import { Injectable } from '@nestjs/common';
import { GradeReview} from './grade-review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GradeReviewRepository {
    constructor(
        @InjectRepository(GradeReview)
        private readonly repository: Repository<GradeReview>, 
    ) {}

    async findByClassId(classId: string): Promise<GradeReview[]> {
        return await this.repository.find({
            where: { classId: classId },
        });
    }

}
