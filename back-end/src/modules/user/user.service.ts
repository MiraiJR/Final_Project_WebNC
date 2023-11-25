import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUser } from './user.interface';
import { AccountService } from '../account/account.service';
import { UserRespDTO } from './dto/response/UserResp';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private accountService: AccountService,
  ) {}

  async createUser(user: IUser): Promise<User> {
    return this.userRepository.save(user);
  }

  async findUserByAccount(username: string): Promise<User> {
    const matchedAccount = await this.accountService.findAccountByUsername(
      username,
    );

    if (!matchedAccount) {
      throw new NotFoundException('Account not found');
    }

    const matchedUser = await this.userRepository.findOne({
      where: {
        account: matchedAccount,
      },
    });

    if (!matchedAccount) {
      throw new NotFoundException('User not found');
    }

    return matchedUser;
  }

  async getMe(username: string): Promise<UserRespDTO> {
    const me = await this.findUserByAccount(username);

    const meResp: UserRespDTO = {
      email: me.email,
      fullname: me.fullname,
    };

    return meResp;
  }

  async updateProfile(
    username: string,
    userReqDto: UserRespDTO,
  ): Promise<UserRespDTO> {
    const me = await this.findUserByAccount(username);

    const informationForUpdating: IUser = {
      ...me,
      ...userReqDto,
    };

    const updatedUser = await this.userRepository.save(informationForUpdating);

    const userResp: UserRespDTO = {
      email: updatedUser.email,
      fullname: updatedUser.fullname,
    };

    return userResp;
  }
}
