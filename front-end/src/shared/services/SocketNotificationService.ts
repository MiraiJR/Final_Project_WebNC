import { socketNotification } from "../libs/socket";


export const SocketNotificationService = {
    connect : ()=> socketNotification.connect(),
    disconnect : ()=>socketNotification.off(),
    joinRoom : () => socketNotification.emit('joinRoom'),
    listenForNewNotification : (callback : (notification: NotificationResp)=> void)=> {
        socketNotification.on("newNotification", (notification: NotificationResp)=>{
            callback(notification);
        })
    }
}