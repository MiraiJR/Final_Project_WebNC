import { queryClient } from "@/shared/libs/react-query";

import UserService from "@/shared/services/UserService";
import { Button, Input } from "@mui/material";
import { Download, Pencil } from "lucide-react";
import { useState } from "react";

import { toast } from "react-toastify";

interface Props {
  student: UserManagementResp;
}
const StudentId = ({ student }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [studentId, setStudentId] = useState(student.studentId);
  const handleSave = async (userId: number, studentId: string) => {
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
    <div className="flex flex-row justify-end">
      <Input
        type="text"
        disabled={isEdit ? false : true}
        disableUnderline={isEdit ? false : true}
        className="self-center"
        defaultValue={student.studentId || ""}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setStudentId(e.target.value);
        }}
      ></Input>

      {isEdit ? (
        <Button onClick={() => handleSave(student.id, studentId || "")}>
          <Download color="blue" />
        </Button>
      ) : (
        <Button onClick={() => setIsEdit(true)}>
          <Pencil color="green" />
        </Button>
      )}
    </div>
  );
};
export default StudentId;
