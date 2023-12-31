import { WebSocketGateway, WebSocketServer,SubscribeMessage,ConnectedSocket } from "@nestjs/websockets";
import { Server,Socket } from "socket.io";
import { UseGuards } from "@nestjs/common";
import { SocketAuthGuard } from "src/shared/guards/SocketAuthGuard";
import { UserId } from "src/shared/decorators/userid.decorator";
import { NotificationRespDto } from "./dto/res/NotificationResponse";

@WebSocketGateway({namespace: "notification"})
export class NotificationGateWay{
    @WebSocketServer() server: Server;

    @UseGuards(SocketAuthGuard)
    @SubscribeMessage('joinRoom')
    handleJoinRoom(@UserId() userId: number, @ConnectedSocket() client: Socket): void{
        client.join(`notification-${userId}`);
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@UserId() userId: number, @ConnectedSocket() client: Socket){
        client.leave(`notification-${userId}`);
    }

    handleNewNotification( notification: NotificationRespDto): void {
        this.server.to(`notification-${notification.receiver.id}`).emit('newNotification', notification);
    }
}