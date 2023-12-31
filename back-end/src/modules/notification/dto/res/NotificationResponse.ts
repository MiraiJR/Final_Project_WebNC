import { UserRespDTO } from "src/modules/user/dto/response/UserResp"
import { NotificationType } from "src/shared/types/EnumNotificationType";

export class NotificationRespDto {
    id: number;
    sender: UserRespDTO;
    receiver: UserRespDTO;
    notifycationType: NotificationType;
    isRead: boolean;
    classId: string;
    gradeStructure: number;
    reviewId: number;
    createdAt: Date;
}