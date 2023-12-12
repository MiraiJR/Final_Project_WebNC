import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeStructure } from './grade-structure.entity';
import { GradeStructureRepository } from './grade-structure.repository';
import { GradeStructureService } from './grade-structure.service';

@Module({
  imports: [TypeOrmModule.forFeature([GradeStructure])],
  controllers: [],
  providers: [GradeStructureRepository, GradeStructureService],
  exports: [GradeStructureService],
})
export class GradeStructureModuleTest {}
