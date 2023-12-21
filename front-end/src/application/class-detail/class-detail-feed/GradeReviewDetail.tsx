import {
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import avatar from "../../../shared/assets/student-minhhoa.png";
import { useEffect, useState } from "react";
import UpdateGradeDialog from "./UpdateGradeDialog";
import { GradeReviewResp } from "@/shared/types/Resp/ClassResp";
interface Comment {
  avatar: string;
  userName: string;
  content: string;
  createAt: string;
}
interface Props {
  info: GradeReviewResp;
}
const GradeReviewDetail = ({ info }: Props) => {
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState<Comment[] | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const data = [
      {
        avatar: avatar,
        userName: "Nguyen Phuoc Hai",
        content: "abc",
        createAt: "2023-12-08T17:42:23.473Z",
      },
      {
        avatar: avatar,
        userName: "Truong Van Hao",
        content: "abc",
        createAt: "2023-12-08T17:42:23.473Z",
      },
      {
        avatar: avatar,
        userName: "Vo Minh Hieu",
        content: "abc",
        createAt: "2023-12-08T17:42:23.473Z",
      },
    ];
    // const data = undefined;
    setComments(data);
  }, []);
  const handleClickButton = () => {
    const data: Comment = {
      avatar: avatar,
      userName: "user name",
      content: userComment,
      createAt: new Date().toISOString(),
    };
    if (comments === undefined) {
      setComments([data]);
      return;
    }
    setComments([...comments!, data]);
  };
  return (
    <>
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
          <ListItemText primary={`Grade Composition: ${info.nameAssignment}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Current Grade: ${info.currPercentScore}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Expected Grade: ${info.expectPercentScore}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Explaination: ${info.explain}`} />
        </ListItem>
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
                key={`${comment.userName}-${comment.content}-${comment.createAt}`}
                className="flex flex-row mb-2"
              >
                <Avatar src={comment.avatar} className="mr-2 mt-2"></Avatar>
                <div className="flex flex-col">
                  <p className="font-bold">{comment.userName}</p>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="flex flex-row">
          <Avatar src={avatar} className="mr-2 self-center"></Avatar>
          <TextField
            multiline
            placeholder="Add comment..."
            className="flex-1"
            onChange={(e) => setUserComment(e.target.value)}
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
    </>
  );
};
export default GradeReviewDetail;
