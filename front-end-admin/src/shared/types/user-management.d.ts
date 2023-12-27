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

type UpdateStudentReq = {
  userId: number;
  studentId: string
}

type StudentIdUser = {
  email: string,
  studentId: string,
  reasonFail: string;
}

type UpdateStudentIdCsvResp = {
  users: StudentIdUser[],
  canRead: boolean,
}