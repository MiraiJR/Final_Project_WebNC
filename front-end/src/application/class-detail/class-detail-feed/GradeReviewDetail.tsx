import {
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  Avatar,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import UpdateGradeDialog from "./UpdateGradeDialog";
import {
  GradeReviewComment,
  GradeReviewResp,
} from "@/shared/types/Resp/ClassResp";
import { toast } from "react-toastify";
import { GradeReviewService } from "@/shared/services/GradeReviewService";
import { useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import { MAIN_COLOR } from "@/shared/utils/constant";
import { SocketCommentService } from "@/shared/services/SocketCommentService";
import { Helper } from "@/shared/utils/heper";
import { useClassDetail } from "../ClassDetail";
import { UserRole } from "@/shared/types/UserRole";
import { useUser } from "@/application/root/Root";

const GradeReviewDetail = () => {
  const info = useLoaderData() as GradeReviewResp;
  const classDetail = useClassDetail();
  const user = useUser();
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState<GradeReviewComment[] | undefined>(
    info.comment
  );
  console.log(info.comment);

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setComments(info.comment);
    SocketCommentService.disconnect();
    SocketCommentService.connect();
    SocketCommentService.joinRoom(info.id);
    SocketCommentService.listenForNewComment((newComment) => {
      setComments((prevComments) =>
        prevComments ? [...prevComments, newComment] : [newComment]
      );
    });
    
    return () => {
      SocketCommentService.disconnect();
    };
  }, [info.id]);

  const handleClickButton = async () => {
    if (userComment.length == 0) {
      toast.error("Comment can not empty");
    }

    const commentReq: CommentGradeReviewReq = {
      content: userComment.trim(),
    };
    try {
      await GradeReviewService.postGradeReviewComment(
        classDetail.idCode,
        info.id,
        commentReq
      );
      setUserComment("");
      toast.success("comment success");
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  return (
    <>
      <Box className={`border-2 rounded-md border-[${MAIN_COLOR}] p-4`}>
        <p className=" text-base m-2 font-bold">Grade Review Detail</p>
        <Divider />
        <List>
          <ListItem>
            <ListItemText
              primary={`Student Name: ${info.studentName}`}
              className="font-bold"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Grade Composition: ${info.nameAssignment}`}
            />
          </ListItem>
          {info.isFinalized ? null : (
            <ListItem>
              <ListItemText
                primary={`Current Grade: ${info.currPercentScore}`}
              />
            </ListItem>
          )}
          <ListItem>
            <ListItemText
              primary={`Expected Grade: ${info.expectPercentScore}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Explaination: ${info.explain}`} />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Checkbox checked={info.isFinalized} />}
              label="Finalized grade"
              style={{ pointerEvents: "none", width: "fit-content" }}
            />
            {info.isFinalized ? (
              <ListItemText
                primary={`Current Grade: ${info.currPercentScore}`}
              />
            ) : null}
          </ListItem>
          {classDetail.role !== UserRole.HS && (
            <div className="flex justify-end mt-2 ">
              <Button variant="contained" onClick={() => setIsOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pencil-line mr-2"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  <path d="m15 5 3 3" />
                </svg>
                Update Grade
              </Button>
            </div>
          )}
        </List>
        <Divider />
        <div className="flex flex-col ">
          <div className="flex items-center font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-circle"
            >
              <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
            </svg>
            Feedback
          </div>

          {comments === undefined ? (
            <></>
          ) : (
            <>
              {comments.map((comment) => (
                <div
                  key={`${comment.author.fullname}-${comment.content}-${comment.createdAt}`}
                  className="flex flex-row mb-2"
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        comment.author.studentId !== info.studentId
                          ? MAIN_COLOR
                          : undefined,
                    }}
                    className="mr-2 mt-2"
                  >
                    {" "}
                    {Helper.getFullNameIcon(comment.author.fullname)}
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-bold">{comment.author.fullname}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="flex flex-row">
            <Avatar
              sx={{
                bgcolor:
                  classDetail.role !== UserRole.HS ? MAIN_COLOR : undefined,
              }}
              className="mr-2 mt-2"
            >
              {" "}
              {Helper.getFullNameIcon(user.fullname)}
            </Avatar>
            <TextField
              multiline
              placeholder="Add comment..."
              className="flex-1"
              onChange={(e) => setUserComment(e.target.value)}
              value={userComment}
            ></TextField>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-send-horizontal"
                onClick={() => handleClickButton()}
              >
                <path d="m3 3 3 9-3 9 19-9Z" />
                <path d="M6 12h16" />
              </svg>
            </Button>
          </div>
        </div>
        <UpdateGradeDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          info={info}
        />
      </Box>
    </>
  );
};
export default GradeReviewDetail;

export async function gradeReviewDetailLoader({
  params,
}: any): Promise<GradeReviewResp> {
  try {
    const gradeReview = (
      await GradeReviewService.getGradeReviewDetailService(
        params.classID,
        params.reviewId
      )
    ).data;

    return gradeReview;
  } catch (e: any) {
    console.log(e);
    toast.error(e.message);
    throw new Error(e);
  }
}
