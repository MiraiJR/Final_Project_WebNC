import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminAccountRepository } from './admin-auth.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthAdminReqDto } from './dto/request/AuthAdminReq';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminAccountService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminAccountRepository: AdminAccountRepository,
    private readonly configService: ConfigService,
  ) {}

  async login(loginReqDto: AuthAdminReqDto): Promise<AdminAccountResp> {
    const matchedAdmin = await this.adminAccountRepository.findByUsername(
      loginReqDto.username,
    );

    if (!matchedAdmin) {
      throw new BadRequestException('Username or password is wrong');
    }

    const isMatchedPassword = await bcrypt.compare(
      loginReqDto.password,
      matchedAdmin.password,
    );

    if (!isMatchedPassword) {
      throw new BadRequestException('Username or password is wrong');
    }

    const accessToken = this.signAccessToken(matchedAdmin.id);
    const refreshToken = this.signRefreshToken(matchedAdmin.id);

    await this.adminAccountRepository.update(matchedAdmin.id, {
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(registerReqDto: AuthAdminReqDto): Promise<void> {
    const matchedAdmin = await this.adminAccountRepository.findByUsername(
      registerReqDto.username,
    );

    if (matchedAdmin) {
      throw new BadRequestException('Username is existed!');
    }

    const accountToCreate = this.adminAccountRepository.create({
      ...registerReqDto,
    });
    await this.adminAccountRepository.save(accountToCreate);
  }

  async logout(adminId: number): Promise<void> {
    const matchedAdmin = await this.adminAccountRepository.findById(adminId);

    if (!matchedAdmin) {
      throw new BadRequestException('Account is existed!');
    }

    await this.adminAccountRepository.update(matchedAdmin.id, {
      accessToken: null,
      refreshToken: null,
    });
  }

  async refreshToken(token: string): Promise<AdminAccountResp> {
    const matchedAccountWithToken =
      await this.adminAccountRepository.findByRefreshToken(token);
    if (!matchedAccountWithToken) {
      throw new BadRequestException('Account is existed!');
    }

    const accessToken = this.signAccessToken(matchedAccountWithToken.id);
    const refreshToken = this.signRefreshToken(matchedAccountWithToken.id);

    await this.adminAccountRepository.update(matchedAccountWithToken.id, {
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
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
}
