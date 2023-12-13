import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassRepository } from './class.repository';
import { UserModule } from '../user/user.module';
import { AuthGuard } from 'src/shared/guards/AuthGuard';
import { ClassUserModule } from '../classUser/class-user.module';
import { RoleGuard } from 'src/shared/guards/RoleGuard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from '../mail/mail.module';
import { GradeStructureModule } from '../grade-structure/grade-structure.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    UserModule,
    JwtModule,
    MailModule,
    ConfigModule,
    GradeStructureModule,
    forwardRef(() => ClassUserModule),
    forwardRef(() => GradeStructureModule)
  ],
  providers: [ClassService, ClassRepository, JwtService, ConfigService],
  controllers: [ClassController],
  exports: [ClassService],
})
export class ClassModule {}
