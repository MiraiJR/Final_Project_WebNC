import { WebSocketGateway, WebSocketServer,SubscribeMessage,MessageBody,ConnectedSocket } from "@nestjs/websockets";
import { Server,Socket } from "socket.io";
import { GradeReviewCommentResponse } from "./dto/res/GradeReviewCommentResp.dto";


@WebSocketGateway()
export class GradeReviewCommentGateWay{
    @WebSocketServer() server: Server;

    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() reviewId: number, @ConnectedSocket() client: Socket): void{
        client.join(`review-${reviewId}`);
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@MessageBody() reviewId: number, @ConnectedSocket() client: Socket){
        client.leave(`review-${reviewId}`);
    }

    @SubscribeMessage('comment')
    handleComment( comment: GradeReviewCommentResponse): void {
        this.server.to(`review-${comment.reviewId}`).emit('newComment', comment);
    }
}