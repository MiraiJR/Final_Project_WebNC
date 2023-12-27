import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { ActionFunction, redirect, useSubmit } from "react-router-dom";
import { toast } from "react-toastify";
import ClassService from "@/shared/services/ClassService";
import { ClassDetailResp } from "@/shared/types/Resp/ClassResp";

interface CreateClassFormDialogProps {
  open: boolean;
  onClose: () => void;
}

interface Inputs {
  code: string;
}

export default function JoinClassFormDialog({
  open,
  onClose,
}: CreateClassFormDialogProps) {
  const submit = useSubmit();
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

  const onSubmit = (data: Inputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    submit(formData, { method: "post", action: `/join/${data.code}` });

    reset(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Join class</DialogTitle>
      <DialogContent sx={{ minWidth: "500px", marginLeft: "20px" }}>
        <TextField
          {...register("code", {
            required: "This Field is required",
            pattern: {
              value:
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
              message: "Code is not correct",
            },
          })}
          autoFocus
          margin="dense"
          id="title"
          label="Class Code (Required)"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <p className="ml-10 text-red-500">{errors.code?.message} </p>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Join</Button>
      </DialogActions>
    </Dialog>
  );
}

export const joinClassAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const classID: string = formData.get("code") as string;
  try {
    const response: ClassDetailResp = (await ClassService.joinClass(classID))
      .data;
    toast.success("Join Class Success");
    return redirect(`/class/${response.idCode}`);
  } catch (e: any) {
    toast.error(e.message);
    return redirect(window.location.href);
  }
};
