import axiosClient from "../libs/axios";

const AdminAuthService = {
  login: (data: AdminAuthReq) =>
    axiosClient.post<AdminAuthToken>(`/admin/auth/login`, data),
  register: (data: AdminAuthReq) =>
    axiosClient.post<string>(`/admin/auth/register`, data),
  logout: () => axiosClient.post<string>(`/admin/auth/logout`),
};

export default AdminAuthService;
