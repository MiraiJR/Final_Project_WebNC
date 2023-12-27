import axiosClient from "../libs/axios";

const UserService = {
    getMe: () => axiosClient.get<UserRespData>('/users/me'),
    updateProfile: (data: UserProfileReq) => axiosClient.patch<UserRespData>('/users/update',data),
}


export default UserService