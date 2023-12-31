import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClassUserRepository } from './class-user.repository';
import { UserService } from 'src/modules/user/user.service';
import { Class } from '../class/class.entity';
import { ClassResponseDto } from '../class/dto/class/ClassResponse.dto';
import { UserRole } from 'src/shared/types/EnumUserRole';
import { User } from '../user/user.entity';
import { MemberDataRespDTO } from './dto/MemberDataRes.dto';
import { StudentsAndTeachersTdo } from './dto/StudentsAndTeachers.dto';
import { JwtService } from '@nestjs/jwt';
import { RoleToken } from 'src/shared/types/RoleToken';
import { ConfigService } from '@nestjs/config';
import { ClassUser } from './class-user.entity';
import { InviteToken } from 'src/shared/types/InviteToken';
@Injectable()
export class ClassUserService {
  constructor(
    private classUserRepository: ClassUserRepository,
    //private classService: ClassService,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async addMemberToClass(
    classroom: Class,
    userId: number,
    role: UserRole = UserRole.HS,
  ): Promise<string> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException('User not exist');
    }

    const newClassUser = this.classUserRepository.create({
      classroom: classroom,
      user: user,
      role,
    });
    await this.classUserRepository.save(newClassUser);

    //generate and return  token
    const payload: RoleToken = {
      userId: newClassUser.userId,
      classCodeId: newClassUser.classId,
      role,
    };
    return await this.signRoleToken(payload);
  }

  async getClassesByUserId(userId: number): Promise<ClassResponseDto[]> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException('User not exist');
    }

    const classUsers = await this.classUserRepository.findClassesByUserId(
      userId,
    );

    if (!classUsers || classUsers.length === 0) {
      return [];
    }

    return classUsers.map((classUser) =>
      this.mapClassToClassResponseDto(classUser),
    );
  }

  private mapClassToClassResponseDto(classUser: ClassUser): ClassResponseDto {
    const { title, creator, idCode, description } = classUser.classroom;

    const ClassResponse: ClassResponseDto = {
      title,
      creator: {
        id: creator.id,
        fullname: creator.fullname,
        email: creator.email,
      },
      idCode,
      description,
      role: classUser.role,
    };
    return ClassResponse;
  }

  async getStudentsAndTeachersByClassId(
    classId: string,
  ): Promise<StudentsAndTeachersTdo> {
    const classUsers = await this.classUserRepository.findUserByClassId(
      classId ,
    );
    const students = classUsers
      .filter((classUser) => classUser.role === UserRole.HS)
      .map((classUser) => this.mapUserToMemberDataRespDto(classUser.user));
    const teachers = classUsers
      .filter(
        (classUser) =>
          classUser.role === UserRole.GV || classUser.role === UserRole.AD,
      )
      .map((classUser) => this.mapUserToMemberDataRespDto(classUser.user));

    return { students, teachers };
  }



  private mapUserToMemberDataRespDto(user: User): MemberDataRespDTO {
    const { email, fullname, id, studentId } = user;
    const MemberDataResp: MemberDataRespDTO = {
      email,
      fullname,
      id,
      studentId,
    };
    return MemberDataResp;
  }

  async isUserInClass(userId: number, classId: string) {
    const classUser = await this.classUserRepository.find({
      where: { classId, userId },
    });
    if (classUser) {
      return true;
    } else {
      return false;
    }
  }

  async generateRoleToken(userId, classId) {
    const classUser: ClassUser = await this.classUserRepository.findOne({
      where: { classId, userId },
    });

    if (!classUser) {
      throw new BadRequestException('User not member of Class');
    }

    const payload: RoleToken = {
      userId: classUser.userId,
      classCodeId: classUser.classId,
      role: classUser.role,
    };

    const roleToken = await this.signRoleToken(payload);
    //Update refresh token to db
    return roleToken;
  }

  signRoleToken(payload: RoleToken): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_KEY'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRED'),
    });
  }

  signInviteToke(payload: InviteToken): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_INVITE_KEY'),
      expiresIn: this.configService.get('JWT_INVITE_KEY_EXPIRED'),
    });
  }

  async verifyInviteToken(token: string, userId: number) {
    try {
      const payload: InviteToken = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_INVITE_KEY'),
      });

      const user = await this.userService.findById(userId);
      if (user.email != payload.email) {
        throw new Error(
          'Please use the account registered with the email address to which the invitation was sent. ',
        );
      }
      return payload;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async findRole(classId: string, userId: number): Promise<UserRole> {
    const classUser: ClassUser = await this.classUserRepository.findOne({
      where: { classId, userId },
    });
    if (classUser == null) {
      return null;
    }
    return classUser.role;
  }
}
