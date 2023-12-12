import { Module, forwardRef } from '@nestjs/common';
import { GradeStructureService } from './gradeStructure.service';
import { GradeStructureController } from './gradeStructure.controller';
import { GradeStructureRepository } from './gradeStructure.repository';
import { ClassModule } from '../class/class.module';

@Module({
    imports: [forwardRef(()=> ClassModule),],
    providers: [GradeStructureService , GradeStructureRepository],
    controllers: [GradeStructureController],
    exports: [GradeStructureService], 
})
export class GradeStructureModule {}
