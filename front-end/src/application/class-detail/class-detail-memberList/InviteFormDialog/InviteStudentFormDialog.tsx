import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { PlusSquare } from "lucide-react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { SendInviteMailReq } from "@/shared/types/Req/SendInviteMailRequest";
import { UserRole } from "@/shared/types/UserRole";
import { toast } from "react-toastify";
import ClassService from "@/shared/services/ClassService";
import { useParams } from "react-router-dom";
interface InviteStudentFormDialogProps {
  open: boolean;
  onClose: () => void;
  memberEmailList: string[];
}

interface Inputs {
  email: string;
}

export default function InviteStudentFormDialog({
  open,
  onClose,
  memberEmailList,
}: InviteStudentFormDialogProps) {
  let { classID } = useParams();
  const [emailList, setEmailList] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    criteriaMode: "firstError",
  });
  const addEmailToList = (data: Inputs) => {
    const newEmail = data.email;
    if (!emailList.includes(newEmail) && !memberEmailList.includes(newEmail)) {
      setEmailList((prevEmailList) => [...prevEmailList, newEmail]);
    } else {
    }
    reset({
      email: "",
    });
  };

  const onSubmit = async () => {
    if (emailList.length == 0) {
      toast.error("List email cannot empty");
      return;
    }
    const data: SendInviteMailReq = {
      emails: emailList,
      role: UserRole.HS,
    };
    try {
      await ClassService.inviteEmailSend(classID as string, data);
      toast.success("Send mai successful");
      closeHandle();
    } catch (e: any) {
      toast.error(e.message);
      throw new Error(e);
    }
  };

  const deleteEmail = (emailToDelete: string) => {
    const updatedEmailList = emailList.filter(
      (email) => email !== emailToDelete
    );
    setEmailList(updatedEmailList);
  };

  const closeHandle = () => {
    setEmailList([]);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Invite to class as Student</DialogTitle>
      <DialogContent sx={{ minWidth: "500px", marginLeft: "20px" }}>
        <div className="flex">
          <TextField
            {...register("email", {
              required: "This Field is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            autoFocus
            margin="dense"
            id="title"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
          />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleSubmit(addEmailToList)}
          >
            <PlusSquare />
          </IconButton>
        </div>
        <p className="ml-10 text-red-500">{errors.email?.message} </p>
        <Stack direction="row" flexWrap="wrap" alignContent="start">
          {emailList.map((email, index) => (
            <Chip
              sx={{ m: 0.5 }}
              key={index}
              label={email}
              variant="outlined"
              onDelete={() => deleteEmail(email)}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandle}>Cancel</Button>
        <Button onClick={onSubmit}>Invite</Button>
      </DialogActions>
    </Dialog>
  );
}
