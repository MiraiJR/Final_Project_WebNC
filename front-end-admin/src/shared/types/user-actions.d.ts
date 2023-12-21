type LockUserReq = {
  userId: number;
  duration: number;
};

type UnlockUserReq = {
  userId: number;
};

type BanOrUnbanUserReq = {
  userId: number;
  isBan: boolean;
};
