import { WebSocketGateway, WebSocketServer,SubscribeMessage,MessageBody,ConnectedSocket } from "@nestjs/websockets";
import { Server,Socket } from "socket.io";
import { GradeReviewCommentResponse } from "./dto/res/GradeReviewCommentResp.dto";


@WebSocketGateway()
export class GradeReviewCommentGateWay{
    @WebSocketServer() server: Server;

    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() reviewId: number, @ConnectedSocket() client: Socket): void{
        client.join(`review-${reviewId}`)
    }

    @SubscribeMessage('comment')
    handleComment(@MessageBody() comment: GradeReviewCommentResponse): void {
        this.server.emit('newComment', comment);
    }
}