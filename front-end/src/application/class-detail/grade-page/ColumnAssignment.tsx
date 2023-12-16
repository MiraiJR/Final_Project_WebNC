import { queryClient } from "@/shared/libs/react-query";
import { GradeService } from "@/shared/services/GradeService";
import { GradeAssignmentResp } from "@/shared/types/Resp/ClassResp";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  ArrowDownFromLine,
  Check,
  FolderUp,
  MoreVertical,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { VisuallyHiddenInput } from "./configs";
import { useRef, useState } from "react";
import { FileHandler } from "@/shared/utils/file-handler";

const COLUMNS_TEMPLATE_GRADE_ASSIGNMENT = ["StudentId", "Score"];
const FILENAME_GRADE_TEMPLATE_ASSIGNMENT = "grade_assignment_template.csv";

interface itemProps {
  gradeStructure: GradeAssignmentResp;
}

const menuItems: CustomMenuItem[] = [
  {
    label: "Finalize",
    icon: Check,
    handler: (gradeStructureId: number) => {
      GradeService.updateStatusForColumnAssignment({
        gradeStructureId,
        isFinalized: true,
      })
        .then((response) => {
          const { data } = response;
          toast.success(data);
          queryClient.invalidateQueries(`getGradeStudentsOfClass`);
        })
        .catch((error: ResponseError) => toast.error(error.message));
    },
    file: false,
  },
  {
    label: "Draft",
    icon: Check,
    handler: (gradeStructureId: number) => {
      GradeService.updateStatusForColumnAssignment({
        gradeStructureId,
        isFinalized: false,
      })
        .then((response) => {
          const { data } = response;
          toast.success(data);
          queryClient.invalidateQueries(`getGradeStudentsOfClass`);
        })
        .catch((error: ResponseError) => toast.error(error.message));
    },
    file: false,
  },
  {
    label: "Upload grade",
    icon: FolderUp,
    handler: () => {},
    file: true,
  },
  {
    label: "Template",
    icon: ArrowDownFromLine,
    handler: () => {
      const csvContent = FileHandler.generateFileCsv(
        COLUMNS_TEMPLATE_GRADE_ASSIGNMENT
      );
      const link = document.createElement("a");
      link.href = URL.createObjectURL(csvContent);
      link.download = FILENAME_GRADE_TEMPLATE_ASSIGNMENT;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    file: false,
  },
];

const ColumnAssignment = ({ gradeStructure }: itemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const open = Boolean(anchorEl);
  const handleShowMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUploadFile = () => {
    if (!fileRef.current) {
      return;
    }

    if (!fileRef.current.files) {
      return;
    }

    const selectedFileInput = fileRef.current.files[0];

    if (selectedFileInput.size > 10 * 1024 * 1024) {
      toast.error("File <= 10MB");
      return;
    }

    if (selectedFileInput.type !== "text/csv") {
      toast.error("File must be csv file!");
      return;
    }

    setSelectedFile(selectedFileInput);
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
  };

  const handleUploadFileToBe = async () => {
    if (!selectedFile || !gradeStructure) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("gradeStructureId", gradeStructure.id.toString());

    GradeService.uploadGradesForAssignment(formData)
      .then((response) => {
        const { data } = response;
        queryClient.invalidateQueries(`getGradeStudentsOfClass`);
        toast.success(data);
      })
      .catch((error: ResponseError) => toast.error(error.message));

    setSelectedFile(null);
  };

  return (
    <th className="text-left p-4 border-l-2" key={gradeStructure.id}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <h2>{gradeStructure.nameAssignment.toUpperCase()}</h2>
          <span className="text-red-400">{gradeStructure.percentScore}%</span>
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
            {menuItems.map((menuItem, _index) => (
              <MenuItem
                key={_index}
                onClick={() => {
                  if (!menuItem.file) {
                    menuItem.handler(gradeStructure.id);
                  }
                }}
                className="relative h-full"
              >
                <Button component="label" startIcon={<menuItem.icon />}>
                  {menuItem.label}
                  {menuItem.file && (
                    <VisuallyHiddenInput
                      ref={fileRef}
                      type="file"
                      accept=".csv"
                      onChange={handleUploadFile}
                    />
                  )}
                </Button>
                {selectedFile && menuItem.file && (
                  <div className="text-white absolute bottom-0 bg-black translate-y-full w-full text-center p-2 normal-case break-words">
                    <div>{selectedFile.name}</div>
                    <div className="flex flex-row items-center gap-4 justify-center mt-2">
                      <button
                        className="bg-red-700 p-1 h-full"
                        onClick={handleCancelUpload}
                      >
                        <X />
                      </button>
                      <button
                        className="bg-green-700 p-1 h-full"
                        onClick={handleUploadFileToBe}
                      >
                        <UploadCloud />
                      </button>
                    </div>
                  </div>
                )}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </th>
  );
};

export default ColumnAssignment;
