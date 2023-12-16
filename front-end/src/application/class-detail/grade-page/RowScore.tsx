import { Helper } from "@/shared/utils/heper";
import { OutlinedInput, Switch } from "@mui/material";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GradeService } from "@/shared/services/GradeService";
import { toast } from "react-toastify";
import { queryClient } from "@/shared/libs/react-query";

interface itemProps {
  score: Score;
  studentId: string;
  gradeStructureId: number;
}

const RowScore = ({ score, studentId, gradeStructureId }: itemProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const editTitleRef = useRef<HTMLFormElement | null>(null);
  const [isFinalized, setIsFinalized] = useState<boolean>(
    score.isFinalized ?? false
  );
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
    </div>
  );
};

export default RowScore;
