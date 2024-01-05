import { socketComment } from "../libs/socket";
import { GradeReviewComment } from "../types/Resp/ClassResp";


export const SocketCommentService = {
    connect : ()=> socketComment.connect(),
    disconnect : ()=>socketComment.off(),
    joinRoom : (reviewId:number) => socketComment.emit('joinRoom',reviewId),
    listenForNewComment : (callback : (comment: GradeReviewComment)=> void)=> {
        socketComment.on("newComment", (comment: GradeReviewComment)=>{
            callback(comment);
        })
    }
}