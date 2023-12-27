import axiosClient from "../libs/axios";

const UserService = {
  getMe: () => axiosClient.get<UserRespData>("/users/me"),
  getUsers: () => axiosClient.get<UserManagementResp[]>("/users/"),
  lockUser: (data: LockUserReq) =>
    axiosClient.patch<string>("/users/actions/lock", data),
  unlockUser: (data: UnlockUserReq) =>
    axiosClient.patch<string>("/users/actions/unlock", data),
  banOrUnbanUser: (data: BanOrUnbanUserReq) =>
    axiosClient.patch<string>("/users/actions/ban-unban", data),
  updateStudent: (data: UpdateStudentReq) =>
    axiosClient.patch<string>("/users/actions/update-student", data),
  uploadStudentIdCsv: (data: FormData) =>
    axiosClient.post<UpdateStudentIdCsvResp>("/users/actions/update-student-id-csv", data),
};

export default UserService;
