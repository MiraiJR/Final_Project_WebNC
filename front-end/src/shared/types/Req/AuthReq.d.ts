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
  email: string | null;
  fullname: string;
  socialId: string;
  socialType: string;
};