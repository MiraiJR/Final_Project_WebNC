import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminAccountService } from './admin-auth.service';
import { AuthAdminReqDto } from './dto/request/AuthAdminReq';
import { AdminId } from 'src/shared/decorators/admin-id.decorator';
import { AdminAuthGuard } from 'src/shared/guards/AdminAuthGuard';
import { RefreshTokenAdminReqDto } from './dto/request/RefreshTokenAdminReq';

@Controller('/admin/auth')
export class AdminAccountController {
  constructor(private readonly adminAccountService: AdminAccountService) {}

  @Post('/login')
  async handleLoginAdmin(
    @Body() reqData: AuthAdminReqDto,
  ): Promise<AdminAccountResp> {
    const tokens = await this.adminAccountService.login(reqData);
    return tokens;
  }

  @Post('/register')
  async handleRegisterAdmin(@Body() reqData: AuthAdminReqDto): Promise<string> {
    await this.adminAccountService.register(reqData);
    return 'Register successfully!';
  }

  @Post('/logout')
  @UseGuards(AdminAuthGuard)
  async handleLogoutAdmin(@AdminId() adminId: number): Promise<string> {
    await this.adminAccountService.logout(adminId);
    return 'Logout successfully!';
  }

  @Post('/refresh-token')
  async handleRefreshToken(
    @Body() reqData: RefreshTokenAdminReqDto,
  ): Promise<AdminAccountResp> {
    const { token } = reqData;
    const tokens = await this.adminAccountService.refreshToken(token);
    return tokens;
  }
}
