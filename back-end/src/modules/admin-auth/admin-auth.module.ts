import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAccountEntity } from './admin-auth.entity';
import { AdminAccountController } from './admin-auth.controller';
import { AdminAccountService } from './admin-auth.service';
import { AdminAccountRepository } from './admin-auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminAccountEntity])],
  controllers: [AdminAccountController],
  providers: [AdminAccountService, AdminAccountRepository],
  exports: [AdminAccountService, AdminAccountRepository],
})
export class AdminAccountModule {}
