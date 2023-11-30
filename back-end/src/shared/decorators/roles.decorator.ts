import { Reflector } from '@nestjs/core';
import { UserRole } from '../types/EnumUserRole';

export const Roles = Reflector.createDecorator<UserRole[]>();