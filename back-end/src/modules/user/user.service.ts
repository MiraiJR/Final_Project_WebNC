import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUser } from './user.interface';
import { UserRespDTO } from './dto/response/UserResp';
import { User } from './user.entity';
import { SocialType } from 'src/shared/types/EnumSocialType';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: IUser): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findBySocialId(socialType: string, socialId: string): Promise<User> {
    switch (socialType) {
      case SocialType.FACEBOOK:
        return this.userRepository.findOne({
          where: {
            facebookId: socialId,
          },
        });
      case SocialType.GOOGLE:
        return this.userRepository.findOne({
          where: {
            googleId: socialId,
          },
        });
      default:
        break;
    }
  }

  async updateUser(user: IUser): Promise<User> {
    return this.userRepository.save(user);
  }

  async getMe(userID: number): Promise<UserRespDTO> {
    const me = await this.findById(userID);

    const meResp: UserRespDTO = {
      email: me.email,
      fullname: me.fullname,
    };

    return meResp;
  }
}
