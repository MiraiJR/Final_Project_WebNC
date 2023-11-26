import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUser } from './user.interface';
import { UserRespDTO } from './dto/response/UserResp';
import { User } from './user.entity';

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

  async updateUser(user: IUser): Promise<User> {
    return this.userRepository.save(user);
  }
}
