type UserManagementResp = {
  id: number;
  email: string;
  fullname: string;
  facebookId: boolean;
  googleId: boolean;
  studentId: string | null;
  isBanned: boolean;
  locked: LockedUserResp | null;
};

type LockedUserResp = {
  lockedAt: Date;
  duration: number;
};
