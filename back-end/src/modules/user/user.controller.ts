import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/AuthGuard';
import UserDecorator from 'src/shared/decorators/user.decorator';
import { UserId } from 'src/shared/decorators/userid.decorator';
import { UserRespDTO } from './dto/response/UserResp';
import { BanOrUnbanUserReqDto } from './dto/request/BanOrUnbanUserReq';
import { UnlockUserReqDto } from './dto/request/UnlockUserReq';
import { LockUserReqDto } from './dto/request/LockUserReq';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async handleGetMe(@UserId() userID: number): Promise<UserRespDTO> {
    return this.userService.getMe(userID);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async handleGetUsers(): Promise<UserManagementResp[]> {
    const users = await this.userService.findUsers();
    return users;
  }

  @Patch('/actions/ban-unban')
  @HttpCode(HttpStatus.OK)
  async handleBanOrUnbanUser(
    @Body() reqData: BanOrUnbanUserReqDto,
  ): Promise<string> {
    const { userId, isBan } = reqData;
    const user = await this.userService.banOrUnbanUser(userId, isBan);

    return isBan ? 'Ban user successfully!' : 'Unban user successfully!';
  }

  @Patch('/actions/lock')
  @HttpCode(HttpStatus.OK)
  async handleLockUser(@Body() reqData: LockUserReqDto): Promise<string> {
    const { userId, duration } = reqData;
    const user = await this.userService.lockUser(userId, duration);
    return 'Lock user successfully!';
  }

  @Patch('/actions/unlock')
  @HttpCode(HttpStatus.OK)
  async handleUnlockUser(@Body() reqData: UnlockUserReqDto): Promise<string> {
    const { userId } = reqData;
    const user = await this.userService.unlockUser(userId);
    return 'Unlock user successfully!';
  }
}
