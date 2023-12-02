type SigninReq = {
  email: string;
  password: string;
};

type RegisterReq = {
  email: string;
  password: string;
  fullname: string;
};

type ChangePasswordReq = {
  token: string;
  password: string;
};

type LoginSocialReq = {
  email: string | undefined,
  name: string,
  socialId: string,
}
