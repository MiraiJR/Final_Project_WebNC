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
import { IsHaveAccountReqDTO } from './dto/request/IsHaveAccountReq';
import {RegisterWithSocialAccountReqDTO} from './dto/request/RegisterWithSocialAccountReq'
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
  
  async loginSocial(LoginSocialReq: LoginSocialReqDTO): Promise<AccountRespDTO>{
    const isExistedAccount = await this.userService.findBySocialId(
      LoginSocialReq.socialId,
    );
    const accessToken = this.signAccessToken(isExistedAccount.id);
    const refreshToken = this.signRefreshToken(isExistedAccount.id);
    const accountResp: AccountRespDTO = {
      accessToken,
      refreshToken,
    };
    await this.userService.updateUser({
      ...isExistedAccount,
      accessToken,
      refreshToken,
    });
    return accountResp;
  }

  async registerWithSocialAcount(RegisterWithSocialAccountReq: RegisterWithSocialAccountReqDTO){
    const isExistedAccount = await this.userService.findBySocialId(
      RegisterWithSocialAccountReq.socialId,
    );
    if (isExistedAccount) {
      throw new BadRequestException('Account is existed!');
    }
   
    if ( RegisterWithSocialAccountReq.verifyEmail === true){
      await this.userService.createUser({
        ...RegisterWithSocialAccountReq,
      });
      return await this.loginSocial({
        socialId: RegisterWithSocialAccountReq.socialId,
      });
    }else {
      console.log("email doesn't verify");
      
      const socialPayloadToken: SocialPayloadToken = {
        ...RegisterWithSocialAccountReq,
      };
      const token = this.signActiveMailToken(socialPayloadToken);

    this.mailService.sendMailVerifyEmail(RegisterWithSocialAccountReq.email, token);

    }
  }

  async isHaveAccount(IsHaveAccountReq: IsHaveAccountReqDTO): Promise<boolean>{
     
    const isExistedAccount = await this.userService.findBySocialId(
      IsHaveAccountReq.socialId,
    );
    if (isExistedAccount) {
      return true;
    }else{
      return false;
    }
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
