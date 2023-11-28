import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassRepository } from './class.repository';
import { UserModule } from '../user/user.module';
import { AuthGuard } from 'src/shared/guards/AuthGuard';
import { ClassUserModule } from '../classUser/class-user.module';



@Module({
  imports: [TypeOrmModule.forFeature([Class]),UserModule,forwardRef(()=>ClassUserModule )],
  providers: [ClassService,ClassRepository,AuthGuard],
  controllers: [ClassController],
  exports: [ClassService]
})
export class ClassModule {}