import axiosClient from "../libs/axios";

const UserService = {
    getMe: () => axiosClient.get<UserRespData>('/users/me')
}


export default UserService