import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockedUserEntity } from './locked-user.entity';
import { LockedUserRepository } from './locked-user.repository';
import { LockedUserService } from './locked-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([LockedUserEntity])],
  controllers: [],
  providers: [LockedUserRepository, LockedUserService],
  exports: [LockedUserRepository, LockedUserService],
})
export class LockedUserModule {}
