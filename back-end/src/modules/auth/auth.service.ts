import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginReqDTO } from './dto/request/LoginReq';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RegisterReqDTO } from './dto/request/RegisterReq';
import { SALT_HASH_PWD } from 'src/shared/configs/salt';
import { UserService } from '../user/user.service';
import { RefreshTokenReqDTO } from './dto/request/RefreshTokenReq';
import { AccountRespDTO } from './dto/response/AccountRespDTO';
import { PayloadToken } from 'src/shared/types/PayloadToken';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async login(loginReqDto: LoginReqDTO): Promise<AccountRespDTO> {
    const matchedAccount = await this.userService.findByEmail(
      loginReqDto.email,
    );

    if (!matchedAccount) {
      throw new BadRequestException('Email or password is wrong');
    }

    const isMatchedPassword = await bcrypt.compare(
      loginReqDto.password,
      matchedAccount.password,
    );

    if (!isMatchedPassword) {
      throw new BadRequestException('Email or password is wrong');
    }

    const accessToken = this.signAccessToken(matchedAccount.id);
    const refreshToken = this.signRefreshToken(matchedAccount.id);

    const accountResp: AccountRespDTO = {
      accessToken,
      refreshToken,
    };

    await this.userService.updateUser({
      ...matchedAccount,
      accessToken,
      refreshToken,
    });

    return accountResp;
  }

  async register(registerReqDto: RegisterReqDTO): Promise<void> {
    const isExistedEmail = await this.userService.findByEmail(
      registerReqDto.email,
    );

    if (isExistedEmail) {
      throw new BadRequestException('Email is existed!');
    }

    const salt = await SALT_HASH_PWD;
    const password = await bcrypt.hash(registerReqDto.password, salt);

    const payloadToken: PayloadToken = {
      ...registerReqDto,
      password,
    };

    const token = this.signActiveMailToken(payloadToken);

    this.mailService.sendMailVerifyEmail(registerReqDto.email, token);
  }

  async refreshToken(dataReq: RefreshTokenReqDTO): Promise<AccountRespDTO> {
    const { token } = dataReq;

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_KEY'),
      });

      const userId = payload.user;
      const matchedAccount = await this.userService.findById(userId);

      if (!matchedAccount) {
        throw new NotFoundException('Account not found');
      }

      const accessToken = this.signAccessToken(matchedAccount.id);
      const refreshToken = this.signRefreshToken(matchedAccount.id);

      const accountResp: AccountRespDTO = {
        accessToken,
        refreshToken,
      };

      await this.userService.updateUser({
        ...matchedAccount,
        accessToken,
        refreshToken,
      });

      return accountResp;
    } catch {
      throw new ForbiddenException('Token is not valid!');
    }
  }

  async verifyEmailToCreateUser(token: string): Promise<void> {
    try {
      const { user } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACTIVE_EMAIL_KEY'),
      });

      const isExistedEmail = await this.userService.findByEmail(user.email);

      if (isExistedEmail) {
        throw new BadRequestException('Email is existed!');
      }

      await this.userService.createUser({
        ...user,
      });
    } catch (error) {
      throw new ForbiddenException('Token is not valid!');
    }
  }

  signAccessToken(payload: number): string {
    return this.jwtService.sign(
      {
        user: payload,
      },
      {
        secret: this.configService.get('JWT_ACCESS_KEY'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRED'),
      },
    );
  }

  signRefreshToken(payload: number): string {
    return this.jwtService.sign(
      {
        user: payload,
      },
      {
        secret: this.configService.get('JWT_REFRESH_KEY'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRED'),
      },
    );
  }

  signActiveMailToken(payload: PayloadToken): string {
    return this.jwtService.sign(
      {
        user: payload,
      },
      {
        secret: this.configService.get('JWT_ACTIVE_EMAIL_KEY'),
        expiresIn: this.configService.get('JWT_ACTIVE_EMAIL_EXPIRED'),
      },
    );
  }
}
