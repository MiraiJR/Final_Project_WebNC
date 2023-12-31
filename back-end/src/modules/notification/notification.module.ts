import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller'; 
import { UserModule } from '../user/user.module';
import { GradeModule } from '../grade/grade.module';
import { ClassUserModule } from '../classUser/class-user.module';
import { NotificationGateWay } from './notification.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
    forwardRef(()=>UserModule),
    forwardRef(()=>GradeModule),
    forwardRef(()=>ClassUserModule),
  ],
  providers: [NotificationRepository,NotificationService,NotificationGateWay],
  controllers: [NotificationController], 
  exports: [NotificationService],
})
export class NotificationModule {}