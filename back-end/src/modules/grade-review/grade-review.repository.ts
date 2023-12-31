import { Injectable } from '@nestjs/common';
import { GradeReview} from './grade-review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GradeReviewRepository extends Repository<GradeReview> {
    constructor(
        @InjectRepository(GradeReview)
        private readonly repository: Repository<GradeReview>, 
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findByClassId(classIdCode: string): Promise<GradeReview[]> {
        return await this.repository.find({
            where: { 
                classIdCode: classIdCode,
                isFinalized: false,
             },
        });
    }

    async updateStateOfReviewByStructureIdAndStudentId(structureId: number, studentId: string): Promise<void> {
        const isFinalized=true;
        await this.repository.update({
            structureId: structureId,
            studentId: studentId,
        }, {isFinalized});
    }

}
