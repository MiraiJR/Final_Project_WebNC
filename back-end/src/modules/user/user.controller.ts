import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/AuthGuard';
import UserDecorator from 'src/shared/decorators/user.decorator';
import { UserRespDTO } from './dto/response/UserResp';
import { UserReqDTO } from './dto/request/UserReq';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async handleGetMe(@UserDecorator() username: string): Promise<UserRespDTO> {
    const me = await this.userService.getMe(username);

    return me;
  }

  @UseGuards(AuthGuard)
  @Put('/me/profile')
  @HttpCode(HttpStatus.OK)
  async handleUpdateProfile(
    @UserDecorator() username: string,
    @Body() userReqDto: UserReqDTO,
  ) {
    const result = await this.userService.updateProfile(username, userReqDto);

    return result;
  }
}
