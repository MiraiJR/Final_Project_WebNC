import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginReqDTO } from './dto/request/LoginReq';
import { RegisterReqDTO } from './dto/request/RegisterReq';
import { AuthGuard } from 'src/shared/guards/AuthGuard';
import UserDecorator from 'src/shared/decorators/user.decorator';
import { AccountRespDTO } from '../account/dto/response/AccountResp';
import { RefreshTokenReqDTO } from './dto/request/RefreshTokenReq';

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

    return 'Register successfully!';
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async handleLogout(@UserDecorator() username: string): Promise<string> {
    await this.authService.logout(username);

    return 'Logout successfully!';
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  async handleRefreshToken(
    @Body() dataReq: RefreshTokenReqDTO,
  ): Promise<AccountRespDTO> {
    const accountResp = await this.authService.refreshToken(dataReq);

    return accountResp;
  }
}
