
import axiosClient from "../libs/axios";


export const NotificationService = {
    getNotification : () => axiosClient.get<NotificationResp[]>('/notifications'),
    markNotificationAsRead : (id: number) => axiosClient.patch<NotificationResp>(`/notifications/${id}/mark-as-read`)
}