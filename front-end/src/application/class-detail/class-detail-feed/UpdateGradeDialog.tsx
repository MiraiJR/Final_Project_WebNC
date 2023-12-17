import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useClassDetail } from "../ClassDetail";
import { Alert } from "@mui/material";
import ClassService from "@/shared/services/ClassService";
import { toast } from "react-toastify";
import { GradeReviewResp } from "@/shared/types/Resp/ClassResp";

interface UpdateGradeDialogProps {
  open: boolean;
  onClose: () => void;
  info: GradeReviewResp;
}

export default function CreateClassFormDialog({
  open,
  onClose,
  info,
}: UpdateGradeDialogProps) {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState<boolean>(true);
  const classDetail = useClassDetail();
  let tempScore: number;
  const handleUpdateButton = async () => {
    // send update grade to server annd update to db
    try {
      const data: UpdateGrade = {
        structureId: info.structureId,
        studentId: info.studentId,
        newScore: tempScore,
      };
      await ClassService.updateScore(data);
      toast.success("Update grade successfully");
      navigate(`/class/${classDetail.idCode}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update student Grade</DialogTitle>
      <DialogContent sx={{ minWidth: "500px", marginLeft: "20px" }}>
        <TextField
          autoFocus
          margin="dense"
          id="updateGrade"
          label="Update Grade"
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0 && value <= 10) {
              setIsValid(true);
              tempScore = value;
            } else {
              tempScore = -1;
              setIsValid(false);
            }
          }}
        />
        {!isValid && (
          <Alert severity="error">Mời nhập điểm trong khoảng từ 0 đến 10</Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateButton}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
