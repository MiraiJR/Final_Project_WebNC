export interface IUser {
  id?: number;
  email?: string;
  fullname?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  facebookId?: string;
  googleId?: string;
}
