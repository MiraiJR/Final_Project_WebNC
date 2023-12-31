import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { LockedUserModule } from '../locked-user/locked-user.module';
import { AdminAccountModule } from '../admin-auth/admin-auth.module';

@Module({
  imports: [
    LockedUserModule,
    TypeOrmModule.forFeature([User]),
    AdminAccountModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
