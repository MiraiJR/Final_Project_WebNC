import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginReqDTO } from './dto/request/LoginReq';
import { RegisterReqDTO } from './dto/request/RegisterReq';
import { AuthGuard } from 'src/shared/guards/AuthGuard';
import UserDecorator from 'src/shared/decorators/user.decorator';
import { RefreshTokenReqDTO } from './dto/request/RefreshTokenReq';
import { AccountRespDTO } from './dto/response/AccountRespDTO';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async handleLogin(@Body() loginReqDto: LoginReqDTO): Promise<AccountRespDTO> {
    const account = await this.authService.login(loginReqDto);

    return account;
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async handleRegister(
    @Body() registerReqDto: RegisterReqDTO,
  ): Promise<string> {
    await this.authService.register(registerReqDto);

    return 'Please! Check your email to verify your account!';
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  async handleRefreshToken(
    @Body() dataReq: RefreshTokenReqDTO,
  ): Promise<AccountRespDTO> {
    const accountResp = await this.authService.refreshToken(dataReq);

    return accountResp;
  }

  @Get('/verify-email')
  @HttpCode(HttpStatus.OK)
  async handleVerifyEmail(@Query('token') token: string) {
    await this.authService.verifyEmailToCreateUser(token);

    return 'Verify email successfully!';
  }
}
