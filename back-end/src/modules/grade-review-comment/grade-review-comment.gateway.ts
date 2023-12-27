import { WebSocketGateway, WebSocketServer,SubscribeMessage,MessageBody,ConnectedSocket } from "@nestjs/websockets";
import { Server,Socket } from "socket.io";
import { GradeReviewCommentResponse } from "./dto/res/GradeReviewCommentResp.dto";
import { UseGuards } from "@nestjs/common";
import { ReviewSocketGuard } from "src/shared/guards/ReviewSocketGuard";
import { SocketAuthGuard } from "src/shared/guards/SocketAuthGuard";


@WebSocketGateway()
export class GradeReviewCommentGateWay{
    @WebSocketServer() server: Server;

    @UseGuards(ReviewSocketGuard)
    @UseGuards(SocketAuthGuard)
    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() reviewId: number, @ConnectedSocket() client: Socket): void{
        client.join(`review-${reviewId}`);
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@MessageBody() reviewId: number, @ConnectedSocket() client: Socket){
        client.leave(`review-${reviewId}`);
    }

    handleComment( comment: GradeReviewCommentResponse): void {
        this.server.to(`review-${comment.reviewId}`).emit('newComment', comment);
    }
}