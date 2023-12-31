import { ConfigService } from '@nestjs/config';
import { GradeStructureRepository } from './grade-structure.repository';
import { Assignment } from 'src/shared/types/Assignment';
import { GradeStructure } from './grade-structure.entity';
import { Injectable } from '@nestjs/common';
import { GradeStructureRespDTO } from './dto/response/GradeStructureResp';
import { ClassService } from '../class/class.service';
@Injectable()
export class GradeStructureService {
  constructor(
    private readonly gradeStructureRepository: GradeStructureRepository,
    private readonly classService: ClassService,
    private readonly configService: ConfigService,
  ) {}

  async getGradeStructureByClassId(
    classId: string,
  ): Promise<GradeStructureRespDTO> {
    try {
      const gradeStructure = await this.gradeStructureRepository.findByClassId(
        classId,
      );

      if (!gradeStructure || gradeStructure.length === 0) {
        return null;
      }
      const rs: GradeStructureRespDTO = {
        assignments: gradeStructure.map((assignment) => {
          const { id, nameAssignment, percentScore, position } = assignment;
          return { id, nameAssignment, percentScore, position };
        }),
      };
      return rs;
    } catch (error) {
      // Log the error or handle it appropriately
      console.error(`Error fetching grade structure: ${error.message}`);
      throw new Error('Failed to fetch grade structure');
    }
  }

  async updateGradeStructure(
    classId: string,
    gradeStructure: GradeStructureRespDTO,
  ): Promise<void> {
    try {
      const classGradeStructure = await this.classService.findByIdCode(classId);
      await this.gradeStructureRepository.updateGradeStructure(
        classGradeStructure,
        gradeStructure,
      );
    } catch (error) {
      throw new Error(`Error updating grade structure: ${error.message}`);
    }

    
    
  }
  async getGradeAssignment(classId: string, gradeStructureId: number): Promise<GradeStructure> {
    // get the grade assignment 
    try {
        const gradeAssignment = await this.gradeStructureRepository.findAssignment(classId, gradeStructureId);
        return gradeAssignment;
    } catch (error) {
        throw new Error(`Error fetching grade assignment: ${error.message}`);    
    }
  }

  async findGradeAssignmentById(id: number): Promise<GradeStructure>{
    return await this.gradeStructureRepository.findOne({
      where:{
        id,
      }
    })
  }
}
