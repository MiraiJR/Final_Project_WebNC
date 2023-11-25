import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { LoginReqDTO } from './dto/request/LoginReq';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AccountRespDTO } from '../account/dto/response/AccountResp';
import { RegisterReqDTO } from './dto/request/RegisterReq';
import { SALT_HASH_PWD } from 'src/shared/configs/salt';
import { Account } from '../account/account.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { RefreshTokenReqDTO } from './dto/request/RefreshTokenReq';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async login(loginReqDto: LoginReqDTO): Promise<AccountRespDTO> {
    const matchedAccount = await this.accountService.findAccountByUsername(
      loginReqDto.username,
    );

    if (!matchedAccount) {
      throw new BadRequestException('Username or password is wrong');
    }

    const isMatchedPassword = await bcrypt.compare(
      loginReqDto.password,
      matchedAccount.password,
    );

    if (!isMatchedPassword) {
      throw new BadRequestException('Username or password is wrong');
    }

    const accessToken = this.signAccessToken(matchedAccount.username);
    const refreshToken = this.signRefreshToken(matchedAccount.username);

    const accountResp: AccountRespDTO = {
      accessToken,
      refreshToken,
    };

    await this.accountService.updateAccount({
      ...matchedAccount,
      accessToken,
      refreshToken,
    });

    return accountResp;
  }

  async register(registerReqDto: RegisterReqDTO): Promise<void> {
    const isExistedUsername = await this.accountService.findAccountByUsername(
      registerReqDto.username,
    );

    if (isExistedUsername) {
      throw new BadRequestException('Username is existed!');
    }

    const salt = await SALT_HASH_PWD;
    const password = await bcrypt.hash(registerReqDto.password, salt);

    let newAccount: Account = {
      username: registerReqDto.username,
      password,
      refreshToken: null,
      accessToken: null,
    };

    newAccount = await this.accountService.createAccount(newAccount);

    await this.userService.createUser({
      email: null,
      fullname: `user_${new Date().getTime()}`,
      account: newAccount,
    });
  }

  async logout(username: string): Promise<void> {
    const matchedAccount = await this.accountService.findAccountByUsername(
      username,
    );

    if (!matchedAccount) {
      throw new NotFoundException('Account not found');
    }

    const updatedAccount: Account = {
      ...matchedAccount,
      accessToken: null,
      refreshToken: null,
    };

    await this.accountService.updateAccount(updatedAccount);
  }

  async refreshToken(dataReq: RefreshTokenReqDTO): Promise<AccountRespDTO> {
    const { token } = dataReq;

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_KEY'),
      });

      const username = payload.user;
      const matchedAccount = await this.accountService.findAccountByUsername(
        username,
      );
      if (!matchedAccount) {
        throw new NotFoundException('Account not found');
      }

      const accessToken = this.signAccessToken(matchedAccount.username);
      const refreshToken = this.signRefreshToken(matchedAccount.username);

      const accountResp: AccountRespDTO = {
        accessToken,
        refreshToken,
      };

      await this.accountService.updateAccount({
        ...matchedAccount,
        accessToken,
        refreshToken,
      });

      return accountResp;
    } catch {
      throw new ForbiddenException('Token is not valid!');
    }
  }

  signAccessToken(payload: string): string {
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

  signRefreshToken(payload: string): string {
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
}
