import { LockedUserEntity } from '../locked-user/locked-user.entity';

export interface IUser {
  id?: number;
  email?: string;
  fullname?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  facebookId?: string;
  googleId?: string;
  studentId?: string;
  isBanned?: boolean;
  locked?: LockedUserEntity;
}
