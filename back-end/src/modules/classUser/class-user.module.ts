import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ClassUser } from './class-user.entity';
import { ClassUserService } from './class-user.service';
import { ClassUserRepository } from './class-user.repository';
import { ClassModule } from '../class/class.module';
import { ClassUserController } from './class-user.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ClassUser]),UserModule,forwardRef(()=> ClassModule)],
  providers: [ClassUserService,ClassUserRepository],
  controllers: [ClassUserController],
  exports: [ClassUserService]
})
export class ClassUserModule {}