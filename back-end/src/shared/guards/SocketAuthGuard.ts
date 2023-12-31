import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
import { request } from 'http';
  
  @Injectable()
  export class SocketAuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const client = context.switchToWs().getClient();
      const token = client.handshake.query.token;
  
      if (!token) {
        throw new UnauthorizedException();
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('JWT_ACCESS_KEY'),
        });
        client.user = payload.user;
      } catch {
        throw new UnauthorizedException();
      }
  
      return true;
    }
  
  }
  