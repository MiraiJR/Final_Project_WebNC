import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { UserRole } from '../types/EnumUserRole';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RoleToken } from '../types/RoleToken';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const roleToken = request?.headers?.roletoken;
    const classId = request?.params?.classIdCode;

    if (!roleToken) {
      throw new UnauthorizedException('Missing roleToken');
    }

    try {
      const payload: RoleToken = await this.jwtService.verifyAsync(roleToken, {
        secret: this.configService.get<string>('JWT_ACCESS_KEY'),
      });
      if (payload.userId != request.user || payload.classCodeId != classId) {
        throw new UnauthorizedException('Invalid roleToken');
      }

      return roles.includes(payload.role);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
