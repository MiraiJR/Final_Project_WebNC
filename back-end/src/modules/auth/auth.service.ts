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
import { SocialPayloadToken } from 'src/shared/types/SocialPayloadToken';
import { MailService } from '../mail/mail.service';
import { ChangePasswordReqDTO } from './dto/request/ChangePasswordReq';
import { LoginSocialReqDTO } from './dto/request/LoginSocialReq';
import { CodeRespDTO } from './dto/response/CodeResponseDTO';
import { SocialType } from 'src/shared/types/EnumSocialType';

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

    if (matchedAccount && !matchedAccount.password) {
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

  async loginSocial(
    reqData: LoginSocialReqDTO,
  ): Promise<AccountRespDTO | CodeRespDTO> {
    const { socialId, email, fullname, socialType } = reqData;

    // check email
    const matchedUser = await this.userService.findBySocialId(
      socialType,
      socialId,
    );

    if (!email && !matchedUser && socialType === SocialType.FACEBOOK) {
      const codeResp: CodeRespDTO = {
        code: 'NEW_ACCOUNT_NOT_FOUND_EMAIL',
      };

      return codeResp;
    }

    if (!matchedUser) {
      const isUsedMail = await this.userService.findByEmail(email);

      if (isUsedMail) {
        throw new BadRequestException('Email is used!');
      }

      if (socialType === SocialType.GOOGLE) {
        const newUser = await this.userService.createUser({
          fullname,
          googleId: socialId,
          email,
        });

        const accessToken = this.signAccessToken(newUser.id);
        const refreshToken = this.signRefreshToken(newUser.id);

        const accountResp: AccountRespDTO = {
          accessToken,
          refreshToken,
        };

        await this.userService.updateUser({
          ...newUser,
          accessToken,
          refreshToken,
        });

        return accountResp;
      }

      //create new
      const payloadToken: SocialPayloadToken = {
        ...reqData,
      };

      const token = this.signActiveMailToken(payloadToken);

      this.mailService.sendMailVerifyEmail(email, token);
      const codeResp: CodeRespDTO = {
        code: 'NEW_ACCOUNT_VERIFY_EMAIL',
      };

      return codeResp;
    }

    if (matchedUser.email === email) {
      await this.userService.updateUser({
        ...matchedUser,
        googleId: socialId,
      });
    }

    const accessToken = this.signAccessToken(matchedUser.id);
    const refreshToken = this.signRefreshToken(matchedUser.id);

    const accountResp: AccountRespDTO = {
      accessToken,
      refreshToken,
    };

    await this.userService.updateUser({
      ...matchedUser,
      accessToken,
      refreshToken,
    });

    return accountResp;
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

      if (user.socialType && user.socialType === SocialType.FACEBOOK) {
        await this.userService.createUser({
          ...user,
          facebookId: user.socialId,
        });
        return;
      }

      if (user.socialType && user.socialType === SocialType.GOOGLE) {
        await this.userService.createUser({
          ...user,
          googleId: user.socialId,
        });
        return;
      }

      await this.userService.createUser({
        ...user,
      });
    } catch (error) {
      throw new ForbiddenException('Token is not valid!');
    }
  }

  async forgotPassword(email: string) {
    const matchedUser = await this.userService.findByEmail(email);

    if (!matchedUser) {
      throw new NotFoundException(`Cannot found user with email [${email}]`);
    }

    const token = this.asignForgotPasswordToken(matchedUser.id);

    this.mailService.sendMailForgetPassword(email, token);
  }

  async changePassword(dataReq: ChangePasswordReqDTO) {
    const { password, token } = dataReq;

    try {
      const { userId } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_FORGOT_PASSWORD_KEY'),
      });

      const matchedUser = await this.userService.findById(userId);

      const salt = await SALT_HASH_PWD;
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.userService.updateUser({
        ...matchedUser,
        password: hashedPassword,
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

  signActiveMailToken(payload: PayloadToken | SocialPayloadToken): string {
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

  asignForgotPasswordToken(userId: number): string {
    return this.jwtService.sign(
      {
        userId,
      },
      {
        secret: this.configService.get('JWT_FORGOT_PASSWORD_KEY'),
        expiresIn: this.configService.get('JWT_FORGOT_PASSWORD_EXPIRED'),
      },
    );
  }
}
