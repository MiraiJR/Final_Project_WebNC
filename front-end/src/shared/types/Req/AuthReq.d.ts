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

type RegisterWithSocialAcount = {
  email: string,
  verifyEmail: boolean;
  fullname: string,
  socialId: string,
}

type IdSocialAcount = {
  socialId: string,
}
