import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './grade.entity';
import { GradeRepository } from './grade.repository';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { UserModule } from '../user/user.module';
import { ClassModule } from '../class/class.module';
import { GradeStructureModule } from '../grade-structure/grade-structure.module';
import { StudentModule } from '../student/student.module';
import { NotificationModule } from '../notification/notification.module';
import { ClassUserModule } from '../classUser/class-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GradeEntity]),
    forwardRef(()=>StudentModule),
    forwardRef(()=>GradeStructureModule),
    forwardRef(()=>ClassModule),
    forwardRef(()=>UserModule),
    forwardRef(()=>NotificationModule),
    forwardRef(()=>ClassUserModule),
  ],
  controllers: [GradeController],
  providers: [GradeRepository, GradeService],
  exports: [GradeService],
})
export class GradeModule {}
