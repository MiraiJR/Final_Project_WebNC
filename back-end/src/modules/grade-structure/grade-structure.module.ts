import { Module, forwardRef } from '@nestjs/common';
import { GradeStructureService } from './grade-structure.service';
import { GradeStructureController } from './grade-structure.controller';
import { GradeStructureRepository } from './grade-structure.repository';
import { ClassModule } from '../class/class.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeStructure } from './grade-structure.entity';
import { ClassRepository } from '../class/class.repository';

@Module({
    imports: [TypeOrmModule.forFeature([GradeStructure, GradeStructureRepository , ClassRepository]),forwardRef(()=> ClassModule),],
    providers: [GradeStructureService , GradeStructureRepository ],
    controllers: [GradeStructureController],
    exports: [GradeStructureService], 
}) 
export class GradeStructureModule {}
