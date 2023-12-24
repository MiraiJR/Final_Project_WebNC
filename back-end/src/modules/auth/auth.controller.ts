import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginReqDTO } from './dto/request/LoginReq';
import { RegisterReqDTO } from './dto/request/RegisterReq';
import { RefreshTokenReqDTO } from './dto/request/RefreshTokenReq';
import { AccountRespDTO } from './dto/response/AccountRespDTO';
import { Response } from 'express';
import { ForgotPasswordReqDTO } from './dto/request/ForgotPasswordReq';
import { ChangePasswordReqDTO } from './dto/request/ChangePasswordReq';
import { LoginSocialReqDTO } from './dto/request/LoginSocialReq';
import { CodeRespDTO } from './dto/response/CodeResponseDTO';
import { UserId } from 'src/shared/decorators/userid.decorator';
import { AuthGuard } from 'src/shared/guards/AuthGuard';

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

  @UseGuards(AuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async handleLogout(@UserId() userId: number): Promise<string> {
    await this.authService.logout(userId);
    return 'logout successfully!';
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
  async handleVerifyEmail(
    @Query('token') token: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.verifyEmailToCreateUser(token);

    return res.redirect(302, `${process.env.URL_FE}/auth/sign-in`);
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  async handleForgotPassword(
    @Body() dataReq: ForgotPasswordReqDTO,
  ): Promise<string> {
    const { email } = dataReq;
    this.authService.forgotPassword(email);

    return 'Please! Check your email to change your password!';
  }

  @Post('/change-password')
  @HttpCode(HttpStatus.OK)
  async handleChangePassword(@Body() dataReq: ChangePasswordReqDTO) {
    await this.authService.changePassword(dataReq);

    return 'Change password successfully!';
  }

  @Post('/login/social')
  @HttpCode(HttpStatus.CREATED)
  async handleLoginSocial(
    @Body() dataReq: LoginSocialReqDTO,
  ): Promise<AccountRespDTO | CodeRespDTO> {
    return this.authService.loginSocial(dataReq);
  }
}
