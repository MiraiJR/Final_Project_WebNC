import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Constant } from 'src/shared/constant';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: Constant.JWT_ACCESS_KEY,
      signOptions: { expiresIn: Constant.JWT_ACCESS_EXPIRED },
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
