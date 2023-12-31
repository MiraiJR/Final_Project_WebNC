

type NotificationResp = {
    id: number;
    sender: UserRespData;
    receiver: UserRespData;
    notifycationType: NotificationType;
    isRead: boolean;
    classId: string;
    gradeStructure: number;
    reviewId: number;
    createdAt: Date;
}