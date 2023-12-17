import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './grade.entity';
import { GradeRepository } from './grade.repository';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { UserModule } from '../user/user.module';
import { ClassModule } from '../class/class.module';
import { GradeStructureModule } from '../grade-structure/grade-structure.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GradeEntity]),
    StudentModule,
    GradeStructureModule,
    ClassModule,
    UserModule,
  ],
  controllers: [GradeController],
  providers: [GradeRepository, GradeService],
  exports: [GradeService],
})
export class GradeModule {}
