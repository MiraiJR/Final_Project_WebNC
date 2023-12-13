import { Button, styled } from "@mui/material";
import { ArrowDownFromLine, UploadCloud } from "lucide-react";
import TableGradeCustom from "./TableGradeCustom";
import { useParams } from "react-router-dom";
import ClassService from "@/shared/services/ClassService";
import { Helper } from "@/shared/utils/heper";
import { FileHandler } from "@/shared/utils/file-handler";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const COLUMNS_STUDENT_TEMPLATE_CSV = ["StudentId", "FullName"];
const FILENAME_STUDENT_TEMPLATE_CSV = "student_list_template.csv";
const FILENAME_GRADE_STRUCTURE_TEMPLATE_CSV = "grade_structure_template.csv";

const GradePage = () => {
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

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row justify-end gap-4">
        <Button
          onClick={handleGenerateStudentTemplate}
          component="label"
          variant="contained"
          startIcon={<ArrowDownFromLine />}
        >
          Student list template
        </Button>
        <Button
          component="label"
          variant="contained"
          startIcon={<UploadCloud />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h2 className="text-base font-bold">Grade board</h2>
          <Button
            component="label"
            variant="contained"
            startIcon={<ArrowDownFromLine />}
            className="w-fit"
            onClick={handleDownloadFileGradeTemplate}
          >
            Grade template
          </Button>
        </div>
        <TableGradeCustom />
      </div>
    </div>
  );
};

export default GradePage;
