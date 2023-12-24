import { ConfigService } from "@nestjs/config";
import { GradeReviewRepository } from "./grade-review.repository";
import { Assignment } from "src/shared/types/Assignment";
import { GradeReview } from "./grade-review.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { GradeReviewRespDTO } from "./dto/response/gradeReviewResp.dto";
import { GradeStructureService } from "../grade-structure/grade-structure.service";
import { StudentService } from "../student/student.service";
import { GradeService } from "../grade/grade.service";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
@Injectable()
export class GradeReviewService {
    constructor (
        private readonly gradeReviewRepository: GradeReviewRepository,
        private readonly gradeStructureService: GradeStructureService,
        private readonly studentService: StudentService,
        private readonly gradeService: GradeService,
        private readonly userServide: UserService,
        private readonly configService: ConfigService,
    ) {}
    
    async findGrandReviewById(reviewId: number){
        return this.gradeReviewRepository.findOne({
            where:{
                id: reviewId,
            }
        })
    }

    async findGradeReviewOfStudentByStructureId(studentId: string, structureId: number){
        try{
            return this.gradeReviewRepository.findOne({
                where :{
                    studentId,
                    structureId,
                }
            })
        }catch(e){
            throw e;
        }
        
    }

    async getGradeReviewByClassId(classIdCode: string): Promise<GradeReviewRespDTO[]> {
        try {
            const gradeReviews = await this.gradeReviewRepository.findByClassId(classIdCode);

            if (!gradeReviews || gradeReviews.length === 0) {
                return [];
            }
            const rs = Promise.all(gradeReviews.map( async  (gradeReview )=> {
                const { id,structureId, studentId, expectPercentScore, explain } = gradeReview;
                const assignment = await this.gradeStructureService.getGradeAssignment(classIdCode, structureId);
                const {nameAssignment} = assignment;
                const gradeStudent = await this.gradeService.getGradeOfAssignment(studentId, structureId);
                //get name from table student
                const studentName = await this.studentService.getStudentName(studentId);
                const rs: GradeReviewRespDTO = { id,structureId, studentId,   studentName, nameAssignment, currPercentScore: gradeStudent.score, expectPercentScore, explain };
                return rs;
            }));
            return rs; 
        } catch (error) {
            // Log the error or handle it appropriately
            console.error(`Error fetching grade review: ${error.message}`);
            throw new Error('Failed to fetch grade review'); 
        }   
    }

    async updateScoreAndDeleteReview( 
        studentId: string,
        structureId: number,
        newScore: number,){
        try {
            await this.gradeService.updateScoreForStudentInGradeStructure(studentId, structureId, newScore);
            await this.gradeReviewRepository.deleteByStructureIdAndStudentId(structureId, studentId);
        } catch (error) {
            // Log the error or handle it appropriately
            console.error(`Error update score: ${error.message}`);
            throw new Error('Failed to update score'); 
        }   
    }

    async createGradeReview(classIdCode : string, userId: number, structureId:number,expectPercentScore: number,explain:string) : Promise<GradeReviewRespDTO>{
        const user:User = await this.userServide.findById(userId);

        const grade = await this.gradeService.getGradeOfAssignment(user.studentId,structureId);
        if(!grade && grade.gradeStructure.classId != classIdCode){
            throw new BadRequestException("Structure ID Not Valid or Not in this Class");
        }else if(!grade.isFinalized){
            throw new BadRequestException("This Score is not Finalized");
        }

        const findGradeReview = this.findGradeReviewOfStudentByStructureId(user.studentId,structureId);
        if(findGradeReview){
            throw new BadRequestException("This assignment is reviewed already");
        }
        

        const gradeReview = this.gradeReviewRepository.create({
            classIdCode,
            structureId,
            studentId : user.studentId,
            expectPercentScore,
            explain,
        })

        const savedGradeReview = await this.gradeReviewRepository.save(gradeReview);

        const gradeReviewResponse : GradeReviewRespDTO={
            id: savedGradeReview.id,
            structureId,
            studentId: user.studentId,
            studentName: user.fullname,
            nameAssignment: grade.gradeStructure.nameAssignment,
            currPercentScore: grade.score,
            expectPercentScore,
            explain,

        } 

        return gradeReviewResponse;
    }
    
}

