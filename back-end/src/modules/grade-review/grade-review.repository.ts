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
            where: { classIdCode: classIdCode },
        });
    }

    async deleteByStructureIdAndStudentId(structureId: number, studentId: string): Promise<void> {
        await this.repository.delete({
            structureId: structureId,
            studentId: studentId,
        });
    }

}
