import { queryClient } from "@/shared/libs/react-query";

import UserService from "@/shared/services/UserService";
import { Button, Input } from "@mui/material";
import { Download } from "lucide-react";
import { useState } from "react";

import { toast } from "react-toastify";

interface Props {
  student: UserManagementResp;
}
const StudentId = ({ student }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [studentId, setStudentId] = useState(student.studentId || "");
  const handleSave = async (userId: number) => {
    if (studentId === student.studentId) return;
    try {
      const updateStudent: UpdateStudentReq = {
        userId: userId,
        studentId: studentId,
      };

      const { data } = await UserService.updateStudent(updateStudent);
      await queryClient.invalidateQueries(`getUsers`);
      toast.success(data);
      setIsEdit(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {!isEdit ? (
        <p className="text-center" onClick={() => setIsEdit(true)}>
          {studentId ? studentId : "Click to map student id"}
        </p>
      ) : (
        <div className="flex flex-row justify-end">
          <Input
            autoFocus
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
              if (
                event.relatedTarget !==
                document.getElementById(`button ${student.id}`)
              ) {
                setIsEdit(false);
              }
            }}
            inputProps={{
              style: { textAlign: "center", width: "fit-content" },
            }}
            type="text"
            disabled={isEdit ? false : true}
            disableUnderline={isEdit ? false : true}
            className="self-center"
            defaultValue={studentId}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStudentId(e.target.value);
            }}
          ></Input>
          <Button
            id={`button ${student.id}`}
            onClick={() => handleSave(student.id)}
          >
            <Download color="blue" />
          </Button>
        </div>
      )}
    </>
  );
};
export default StudentId;
