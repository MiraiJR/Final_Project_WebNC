import { Helper } from "@/shared/utils/heper";
import { Button, MenuItem, OutlinedInput, Menu, Switch } from "@mui/material";
import { Check, FolderUp, MoreVertical, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { VisuallyHiddenInput } from "./configs";
import { SubmitHandler, useForm } from "react-hook-form";
import { GradeService } from "@/shared/services/GradeService";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

const menuItems: CustomMenuItem[] = [
  {
    label: "Finalize",
    icon: Check,
    handler: () => {
      console.log("hello");
    },
    file: false,
  },
  {
    label: "Upload grade",
    icon: FolderUp,
    handler: () => {
      alert("Upload array");
    },
    file: true,
  },
];

interface itemProps {
  score: Score;
  studentId: string;
  gradeStructureId: number;
}

const RowScore = ({ score, studentId, gradeStructureId }: itemProps) => {
  const queryClient = useQueryClient();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const editTitleRef = useRef<HTMLFormElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isFinalized, setIsFinalized] = useState<boolean>(
    score.isFinalized ?? false
  );
  const open = Boolean(anchorEl);
  const handleShowMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { register, handleSubmit, setValue } = useForm<UpdateScoreReq>();
  const onSubmit: SubmitHandler<UpdateScoreReq> = (reqData) => {
    if (reqData.newScore === score.value) {
      return;
    }

    GradeService.updateScoreForSpecificAssignment({
      ...reqData,
      newScore: parseFloat(reqData.newScore.toString()),
    })
      .then((response) => {
        const { data } = response;
        queryClient.invalidateQueries(`getGradeStudentsOfClass`);
        toast.success(data);
        setIsEditable(false);
      })
      .catch((error: ResponseError) => toast.error(error.message));
  };

  useEffect(() => {
    if (score && studentId && gradeStructureId) {
      setValue("newScore", score.value);
      setValue("studentId", studentId);
      setValue("gradeStructureId", gradeStructureId);
    }
  }, [score, studentId, gradeStructureId]);

  const handleChangeStatusGrade = async () => {
    GradeService.updateStatusForSpecificAssignmentOfStudent({
      studentId,
      gradeStructureId,
      isFinalized: !isFinalized,
    })
      .then((response) => {
        const { data } = response;
        queryClient.invalidateQueries(`getGradeStudentsOfClass`);
        toast.success(data);
        setIsEditable(false);
        setIsFinalized(!isFinalized);
      })
      .catch((error: ResponseError) => toast.error(error.message));
  };

  return (
    <div className="flex flex-row justify-between items-center">
      {!isEditable && (
        <span onClick={() => setIsEditable(true)}>{score.value}</span>
      )}
      {isEditable && (
        <form
          ref={editTitleRef}
          className="relative w-fit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <OutlinedInput
            autoFocus
            type="number"
            className="w-fit bg-white max-w-[100px]"
            {...register("newScore")}
            onFocus={() =>
              Helper.handleOutSideClick(editTitleRef, setIsEditable)
            }
            id="outlined-adornment-weight"
            inputProps={{
              max: 10,
              min: 0,
              step: "any",
            }}
          />
          <div className="flex flex-row justify-end gap-2 mt-2 absolute right-0 z-10">
            <button type="submit">
              <Check
                size={40}
                className="p-2 rounded-sm shadow-lg cursor-pointer bg-green-500"
              />
            </button>
            <X
              size={40}
              className="p-2 bg-red-500 rounded-sm shadow-lg cursor-pointer"
              onClick={() => setIsEditable(false)}
            />
          </div>
        </form>
      )}
      <div className="text-red-400 flex flex-col items-center justify-center">
        <span
          className={`${
            isFinalized ? "text-green-700" : "text-red-700"
          } font-bold`}
        >
          {isFinalized ? "Finailized" : "Draft"}
        </span>
        <Switch checked={isFinalized} onChange={handleChangeStatusGrade} />
      </div>
      <div>
        <button onClick={handleShowMenu}>
          <MoreVertical />
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {menuItems.map((item, _index) => (
            <MenuItem key={_index}>
              <Button component="label" startIcon={<item.icon />}>
                {item.label}
                {item.file && <VisuallyHiddenInput type="file" />}
              </Button>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default RowScore;
