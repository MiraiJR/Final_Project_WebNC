import { Button } from "@mui/material";
import { ArrowDownFromLine, UploadCloud, X } from "lucide-react";
import TableGradeCustom from "./TableGradeCustom";
import { useParams } from "react-router-dom";
import ClassService from "@/shared/services/ClassService";
import { Helper } from "@/shared/utils/heper";
import { FileHandler } from "@/shared/utils/file-handler";
import { RefObject, useRef, useState } from "react";
import { toast } from "react-toastify";
import StudentService from "@/shared/services/StudentService";
import { VisuallyHiddenInput } from "./configs";
import { GradeService } from "@/shared/services/GradeService";
import { useQueryClient } from "react-query";
import { GradeAssignmentResp } from "@/shared/types/Resp/ClassResp";

const COLUMNS_STUDENT_TEMPLATE_CSV = ["StudentId", "FullName"];
const FILENAME_STUDENT_TEMPLATE_CSV = "student_list_template.csv";
const FILENAME_GRADE_STRUCTURE_TEMPLATE_CSV = "grade_structure_template.csv";

enum TypeUpload {
  GRADE = "grade",
  STUDENT = "student",
}

const GradePage = () => {
  const queryClient = useQueryClient();
  const uploadFileGradeTemplate = useRef<HTMLInputElement | null>(null);
  const uploadFileStudentTemplate = useRef<HTMLInputElement | null>(null);
  const { classID } = useParams();
  const handleGenerateStudentTemplate = () => {
    const csvContent = FileHandler.generateFileCsv(
      COLUMNS_STUDENT_TEMPLATE_CSV
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvContent);
    link.download = FILENAME_STUDENT_TEMPLATE_CSV;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [fileStudentListTemplate, setFileStudentListTemplate] =
    useState<File | null>(null);
  const [fileGradeStudentListTemplate, setFileGradeStudentListTemplate] =
    useState<File | null>(null);

  const handleDownloadFileGradeTemplate = async () => {
    if (!classID) {
      return;
    }
    const { data } = await ClassService.getGradeStructure(classID);
    const { assignments } = data;

    const columns = assignments.map((assignment) =>
      Helper.capitalizeString(assignment.nameAssignment)
    );

    const csvContent = FileHandler.generateFileCsv(["studentId", ...columns]);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvContent);
    link.download = FILENAME_GRADE_STRUCTURE_TEMPLATE_CSV;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleUploadFile = (
    ref: RefObject<HTMLInputElement>,
    type: TypeUpload
  ) => {
    if (!ref.current) {
      return;
    }

    if (!ref.current.files) {
      return;
    }

    const selectedFile = ref.current.files[0];
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File <= 10MB");
      return;
    }

    if (selectedFile.type !== "text/csv") {
      toast.error("File must be csv file!");
      return;
    }

    if (type === TypeUpload.STUDENT) {
      setFileStudentListTemplate(selectedFile);
      return;
    }

    setFileGradeStudentListTemplate(selectedFile);
  };

  const handleCancelUpload = (type: TypeUpload) => {
    if (type === TypeUpload.STUDENT) {
      setFileStudentListTemplate(null);
      return;
    }

    setFileGradeStudentListTemplate(null);
  };

  const handleUploadFileStudentListTemplate = async () => {
    if (!fileStudentListTemplate || !classID) {
      return;
    }

    const formData = new FormData();
    formData.append("file", fileStudentListTemplate);
    formData.append("classId", classID);

    try {
      const { data } = await StudentService.uploadStudentListCsv(formData);

      toast.success(data);
      await queryClient.invalidateQueries([`getGradeStudentsOfClass`, classID]);
    } catch (error: any) {
      toast.error(error.message);
    }

    setFileStudentListTemplate(null);
  };

  const handleUploadFileGradeStudentListTemplate = async () => {
    if (!fileGradeStudentListTemplate || !classID) {
      return;
    }

    const formData = new FormData();
    formData.append("file", fileGradeStudentListTemplate);
    formData.append("classId", classID);

    try {
      const { data } = await GradeService.uploadGradeStudentListCsv(
        classID,
        formData
      );

      toast.success(data);
      await queryClient.invalidateQueries([`getGradeStudentsOfClass`, classID]);
    } catch (error: any) {
      toast.error(error.message);
    }

    setFileGradeStudentListTemplate(null);
  };

  const handleExportGradeBoard = async () => {
    if (!classID) {
      return;
    }

    const { data } = await ClassService.getGradeStructure(classID);
    const { assignments } = data;

    const columns = assignments.map((assignment) =>
      Helper.capitalizeString(assignment.nameAssignment)
    );
    const { data: gradeStudents } = await GradeService.getGradeStudentsOfClass(
      classID
    );

    if (!gradeStudents) {
      return;
    }

    const headerRow: string[] = ["StudentId", ...columns, "Total"];
    let rowDatas: string[] = [];
    rowDatas.push(headerRow.join(","));
    gradeStudents.forEach((gradeStudent) => {
      rowDatas.push(
        [
          gradeStudent.studentId,
          ...gradeStudent.scores.map((score) => score.value),
          calculateAverageGrade(gradeStudent, assignments),
        ].join(",")
      );
    });

    const csvContent = FileHandler.generateFileCsv([rowDatas.join("\n")]);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvContent);
    link.download = FILENAME_GRADE_STRUCTURE_TEMPLATE_CSV;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateAverageGrade = (
    gradeStudent: GradeStudent,
    gradeStructures: GradeAssignmentResp[]
  ): number => {
    let averageGrade = 0;
    for (const _index in gradeStructures) {
      averageGrade +=
        (gradeStructures[_index].percentScore / 100) *
        gradeStudent.scores[_index].value;
    }

    return averageGrade;
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row justify-end gap-4">
        <Button
          onClick={handleGenerateStudentTemplate}
          component="label"
          variant="contained"
          startIcon={<ArrowDownFromLine />}
        >
          Student template
        </Button>
        <div className="relative">
          <Button
            component="label"
            variant="contained"
            startIcon={<UploadCloud />}
          >
            Student template
            <VisuallyHiddenInput
              ref={uploadFileStudentTemplate}
              type="file"
              accept=".csv"
              onChange={() =>
                handleUploadFile(uploadFileStudentTemplate, TypeUpload.STUDENT)
              }
            />
          </Button>
          {fileStudentListTemplate && (
            <div className="text-white absolute bottom-0 bg-black translate-y-full w-full text-center p-2 normal-case break-words">
              <div>{fileStudentListTemplate.name}</div>
              <div className="flex flex-row items-center gap-4 justify-center mt-2">
                <button
                  className="bg-red-700 p-1 h-full"
                  onClick={() => handleCancelUpload(TypeUpload.STUDENT)}
                >
                  <X />
                </button>
                <button
                  className="bg-green-700 p-1 h-full"
                  onClick={handleUploadFileStudentListTemplate}
                >
                  <UploadCloud />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h2 className="text-base font-bold">Grade board</h2>
          <div className="flex flex-row gap-4">
            <Button
              component="label"
              variant="contained"
              startIcon={<ArrowDownFromLine />}
              className="w-fit"
              onClick={handleDownloadFileGradeTemplate}
            >
              Grade template
            </Button>
            <div className="relative">
              <Button
                component="label"
                variant="contained"
                startIcon={<UploadCloud />}
              >
                Grade template
                <VisuallyHiddenInput
                  ref={uploadFileGradeTemplate}
                  type="file"
                  accept=".csv"
                  onChange={() => {
                    handleUploadFile(uploadFileGradeTemplate, TypeUpload.GRADE);
                  }}
                />
              </Button>
              {fileGradeStudentListTemplate && (
                <div className="text-white absolute bottom-0 bg-black translate-y-full w-full text-center p-2 normal-case break-words">
                  <div>{fileGradeStudentListTemplate.name}</div>
                  <div className="flex flex-row items-center gap-4 justify-center mt-2">
                    <button
                      className="bg-red-700 p-1 h-full"
                      onClick={() => handleCancelUpload(TypeUpload.GRADE)}
                    >
                      <X />
                    </button>
                    <button
                      className="bg-green-700 p-1 h-full"
                      onClick={handleUploadFileGradeStudentListTemplate}
                    >
                      <UploadCloud />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Button
              component="label"
              variant="contained"
              startIcon={<ArrowDownFromLine />}
              className="w-fit"
              onClick={handleExportGradeBoard}
            >
              Export grade board
            </Button>
          </div>
        </div>
        <TableGradeCustom />
      </div>
    </div>
  );
};

export default GradePage;
