import axiosClient from "../libs/axios";

const AuthService = {
  sigin: (data: SigninReq) => axiosClient.post<AuthToken>(`/auth/login`, data),
  register: (data: RegisterReq) =>
    axiosClient.post<string>(`/auth/register`, data),
  forgotPassowrd: (data: string) =>
    axiosClient.post<string>(`/auth/forgot-password`, {
      email: data,
    }),
  changePassword: (data: ChangePasswordReq) =>
    axiosClient.post<string>(`/auth/change-password`, data),
  loginSocial: (data: string) => axiosClient.post<AuthToken>(`/auth/login-social`, data),
  registerWithSocialAcount: (data: LoginSocialReq) => axiosClient.post<AuthToken>(`/auth/register-social`, data),
  isHaveAccount: (data: string) => axiosClient.post<boolean>(`/auth/is-have-account`, data),
};

export default AuthService;
