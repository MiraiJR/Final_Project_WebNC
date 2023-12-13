import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
} from "@mui/x-data-grid";
import { Check, FolderUp, LucideIcon } from "lucide-react";

const ROW_WIDTH: number = 300;

const columns: GridColDef[] = [
  { field: "id", headerName: "Student Id", minWidth: ROW_WIDTH },
  { field: "fullname", headerName: "Full name", minWidth: ROW_WIDTH },
  { field: "average", headerName: "Average", minWidth: ROW_WIDTH },
  {
    field: "midterm",
    headerName: "Midterm",
    minWidth: ROW_WIDTH,
    editable: true,
    type: "number",
  },
  {
    field: "finalProject",
    headerName: "Final Project",
    minWidth: ROW_WIDTH,
    editable: true,
    type: "number",
  },
];

const rows = [
  {
    id: "20120471",
    fullname: "Truong Van Hao",
    average: 0,
    midterm: 0,
    finalProject: 0,
  },
];

const PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 50, 100];

interface IMenuItem {
  label: string;
  icon: LucideIcon;
  handle: Function;
}

function CustomMenuColumnItems() {
  const menuItems: IMenuItem[] = [
    {
      label: "Finalize",
      icon: Check,
      handle: () => {
        alert("Finalize");
      },
    },
    {
      label: "Upload grade",
      icon: FolderUp,
      handle: () => {
        alert("Upload array");
      },
    },
  ];
  return (
    <div>
      {menuItems.map((item, _index) => (
        <MenuItem className="w-full" key={_index}>
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText onClick={() => item.handle()}>
            {item.label}
          </ListItemText>
        </MenuItem>
      ))}
    </div>
  );
}

function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuUserItem: CustomMenuColumnItems,
        columnMenuColumnsItem: null,
        columnMenuFilterItem: null,
        columnMenuSortItem: null,
      }}
    />
  );
}

const TableGrade = () => {
  return (
    <div className="h-full w-full">
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          columnMenu: CustomColumnMenu,
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: PAGE_SIZE_OPTIONS[0] },
          },
        }}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  );
};

export default TableGrade;
