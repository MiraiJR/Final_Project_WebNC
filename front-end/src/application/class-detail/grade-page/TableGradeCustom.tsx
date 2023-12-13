import { Helper } from "@/shared/utils/heper";
import {
  Button,
  Menu,
  MenuItem,
  OutlinedInput,
  TablePagination,
  styled,
} from "@mui/material";
import { Check, FolderUp, LucideIcon, MoreVertical, X } from "lucide-react";
import React, { useRef, useState } from "react";
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

interface IColumnItem {
  label: string;
  field: string;
  disableMenu: boolean;
}

interface IMenuItem {
  label: string;
  handler: Function;
  icon: LucideIcon;
  file: boolean;
}

const columnItems: IColumnItem[] = [
  {
    label: "StudentId",
    field: "studentId",
    disableMenu: true,
  },
  {
    label: "Full name",
    field: "fullName",
    disableMenu: true,
  },
  {
    label: "Average",
    field: "average",
    disableMenu: true,
  },
  {
    label: "Midterm",
    field: "midterm",
    disableMenu: false,
  },
  {
    label: "Final Project",
    field: "finalProject",
    disableMenu: false,
  },
];

const rows = [
  {
    studentId: "20120471",
    fullname: "Truong Van Hao",
    average: 0,
    midterm: 0,
    finalProject: 0,
  },
  {
    studentId: "20120471",
    fullname: "Truong Van Hao",
    average: 0,
    midterm: 0,
    finalProject: 0,
  },
  {
    studentId: "20120471",
    fullname: "Truong Van Hao",
    average: 0,
    midterm: 0,
    finalProject: 0,
  },
  {
    studentId: "20120471",
    fullname: "Truong Van Hao",
    average: 0,
    midterm: 0,
    finalProject: 0,
  },
  {
    studentId: "20120471",
    fullname: "Truong Van Hao",
    average: 0,
    midterm: 0,
    finalProject: 0,
  },
  {
    studentId: "20120471",
    fullname: "Truong Van Hao",
    average: 0,
    midterm: 0,
    finalProject: 0,
  },
  {
    studentId: "20120471",
    fullname: "Truong Van Hao",
    average: 0,
    midterm: 0,
    finalProject: 0,
  },
  {
    studentId: "20120471",
    fullname: "Truong Van Hao",
    average: 0,
    midterm: 0,
    finalProject: 0,
  },
];

const menuItems: IMenuItem[] = [
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

const TableGradeCustom = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleShowMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <table className="border-2 w-full table-fixed">
        <thead className="border-b-2">
          <tr>
            {columnItems.map((item, _index) => (
              <th className="text-left p-4 border-l-2" key={_index}>
                <div className="flex flex-row items-center justify-between">
                  <h2>{item.label}</h2>
                  {!item.disableMenu && (
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
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-b-2">
          {rows.map((row, _index) => (
            <tr key={_index} className="border-b-2">
              <td className="border-r-2 p-2">{row.studentId}</td>
              <td className="border-r-2 p-2">{row.fullname}</td>
              <td className="border-r-2 p-2">{row.average}</td>
              <td className="border-r-2 p-2">
                <RowWithMenu />
              </td>
              <td className="border-r-2 p-2">
                <RowWithMenu />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" border-2 border-t-0 flex flex-row justify-end">
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

const RowWithMenu = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const editTitleRef = useRef<HTMLFormElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleShowMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-row justify-between items-center">
      {!isEditable && <span onClick={() => setIsEditable(true)}>0</span>}
      {isEditable && (
        <form ref={editTitleRef} className="relative w-fit">
          <OutlinedInput
            autoFocus
            type="number"
            className="w-full bg-white"
            onFocus={() =>
              Helper.handleOutSideClick(editTitleRef, setIsEditable)
            }
            id="outlined-adornment-weight"
            inputProps={{
              max: 10,
              min: 0,
            }}
          />
          <div className="flex flex-row justify-end gap-2 mt-2 absolute right-0 z-10">
            <button type="submit">
              <Check
                size={40}
                className="p-2 bg-white hover:bg-slate-100 rounded-sm shadow-lg cursor-pointer"
              />
            </button>
            <X
              size={40}
              className="p-2 bg-white hover:bg-slate-100 rounded-sm shadow-lg cursor-pointer"
              onClick={() => setIsEditable(false)}
            />
          </div>
        </form>
      )}
      <span className="text-red-400">Drawf</span>
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

export default TableGradeCustom;
