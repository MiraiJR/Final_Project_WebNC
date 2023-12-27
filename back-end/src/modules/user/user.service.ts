import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUser } from './user.interface';
import { UserRespDTO } from './dto/response/UserResp';
import { User } from './user.entity';
import { SocialType } from 'src/shared/types/EnumSocialType';
import { LockedUserService } from '../locked-user/locked-user.service';
import { UserUpdateDTO } from './dto/request/UserReq';
import { LockedUserEntity } from '../locked-user/locked-user.entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly lockedUserService: LockedUserService,
  ) {}

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
    const matchedUser = await this.userRepository.findById(id);

    if (!matchedUser) {
      throw new NotFoundException('User not found!');
    }

    return matchedUser;
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

  async updateUserProfile(userID: number,updateData : UserUpdateDTO) : Promise<UserRespDTO>{
      const user = await this.findById(userID);
      if(!userID){
        throw new BadRequestException("UserID not valid");
      }
  
      const isStudentIDExist = await this.userRepository.findOne({
        where: {
          studentId: updateData.studentId,
        },
      });
      console.log(isStudentIDExist);
      if(isStudentIDExist != null){
        throw new BadRequestException("StudentID is used by another student. Please choose another StudentID.")
      }
  
      user.fullname = updateData.fullname;
      user.studentId = updateData.studentId;
      this.userRepository.save(user);
      
      const userResp: UserRespDTO = {
        email: user.email,
        fullname: user.fullname,
        studentId: user.studentId,
      };
  
      return userResp
   
  }

  async getMe(userID: number): Promise<UserRespDTO> {
    const me = await this.findById(userID);

    const meResp: UserRespDTO = {
      email: me.email,
      fullname: me.fullname,
      studentId: me.studentId,
    };

    return meResp;
  }

  async findByStudentId(studentId: string): Promise<UserRespDTO> {
    const matchedStudent = await this.userRepository.findOne({
      where: {
        studentId,
      },
    });

    if (!matchedStudent) {
      throw new NotFoundException(
        `Student with id ${studentId} not found in class!`,
      );
    }

    const matchedStudentResp: UserRespDTO = {
      email: matchedStudent.email,
      fullname: matchedStudent.fullname,
      studentId: matchedStudent.studentId,
      id: matchedStudent.id,
    };

    return matchedStudentResp;
  }

  async findUsers(): Promise<UserManagementResp[]> {
    const users = await this.userRepository.find({
      order: {
        id: 'asc',
      },
    });

    return users.map((user) => user.convertToResp());
  }

  async banOrUnbanUser(
    userId: number,
    isBanned: boolean,
  ): Promise<UserManagementResp> {
    const userToUpdate = await this.findById(userId);

    await this.userRepository.update(userToUpdate.id, {
      isBanned,
    });

    return (await this.findById(userId)).convertToResp();
  }

  async lockUser(
    userId: number,
    duration: number,
  ): Promise<UserManagementResp> {
    const userToUpdate = await this.findById(userId);
    const lockedUser = await this.lockedUserService.create(userId, duration);

    await this.userRepository.update(userToUpdate.id, {
      locked: lockedUser,
    });

    return (await this.findById(userId)).convertToResp();
  }

  async unlockUser(userId: number): Promise<UserManagementResp> {
    const userToUpdate = await this.findById(userId);
    await this.lockedUserService.delete(userId);

    await this.userRepository.update(userToUpdate.id, {
      locked: null,
    });

    return (await this.findById(userId)).convertToResp();
  }
}
