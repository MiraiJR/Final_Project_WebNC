import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useNavigate } from "react-router";

interface UpdateGradeDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateClassFormDialog({
  open,
  onClose,
}: UpdateGradeDialogProps) {
  const navigate = useNavigate();
  const [updateGrade, setUpdateGrade] = useState<number>(-1);
  const handleUpdateButton = () => {
    console.log(updateGrade);
    // send update grade to server annd update to db

    navigate("/class/:classId");
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
          onChange={(e) => setUpdateGrade(Number(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateButton}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
