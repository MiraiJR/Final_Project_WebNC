import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/AuthGuard';
import UserDecorator from 'src/shared/decorators/user.decorator';
import { UserId } from 'src/shared/decorators/userid.decorator';
import { UserRespDTO } from './dto/response/UserResp';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async handleGetMe(@UserId() userID : number ) : Promise<UserRespDTO>{
    return this.userService.getMe(userID);
  }

}
