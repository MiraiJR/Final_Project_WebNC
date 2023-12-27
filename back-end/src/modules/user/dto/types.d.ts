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

type StudentIdUser = {
  email: string;
  studentId:string;
  reasonFail: string;
}

type MapStudentIdByFileCsvResp = {
  users: StudentIdUser[];
  canRead: boolean;
}