import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useQuery, useQueryClient } from "react-query";
import { getClasses } from "@/shared/services/QueryService";
import { ShieldCheck, ShieldX } from "lucide-react";
import { toast } from "react-toastify";
import { ClassRespData } from "@/shared/types/Resp/ClassResp";
import ClassService from "@/shared/services/ClassService";

interface Column {
  id:
    | "idCode"
    | "title"
    | "created_at"
    | "creatorName"
    | "creatorEmail"
    | "description"
    | "isActive"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
  sortable?: boolean;
}

const columns: readonly Column[] = [
  {
    id: "idCode",
    label: "Class Code",
    minWidth: 170,
    align: "right",
    sortable: true,
  },
  {
    id: "title",
    label: "Title",
    minWidth: 170,
    align: "right",
    sortable: true,
  },
  {
    id: "created_at",
    label: "Created At",
    minWidth: 170,
    align: "right",
    sortable: true,
  },
  {
    id: "creatorName",
    label: "Creator Name",
    minWidth: 170,
    align: "center",
    sortable: true,
  },
  {
    id: "creatorEmail",
    label: "Creator Email",
    minWidth: 170,
    align: "right",
    sortable: true,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right",
    sortable: true,
  },
  {
    id: "isActive",
    label: "Active",
    minWidth: 170,
    align: "center",
    sortable: true,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
    sortable: false,
  },
];

interface Props {
  searchText: string;
}

export default function ListClassesTable({ searchText }: Props) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof Column>(
    "idCode" as keyof Column
  );
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data: rows } = useQuery<ClassRespData[]>(`getClasses`, () =>
    getClasses()
  );
  if (rows) {
    rows.map((row) => {
      row.created_at = new Date(row.created_at);
    });
  }

  let UIrows: ClassRespData[] | undefined;
  if (searchText !== "") {
    UIrows = rows?.filter((row) => {
      return (
        row.title.toLowerCase().includes(searchText.toLowerCase()) ||
        row.idCode.toLowerCase().includes(searchText.toLowerCase()) ||
        row.description.toLowerCase().includes(searchText.toLowerCase()) ||
        row.creator.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
        row.creator.email.toLowerCase().includes(searchText.toLowerCase()) ||
        row.created_at
          .toDateString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    });
  } else {
    UIrows = rows;
  }

  const handleSetUserState = async (
    classData: ClassRespData,
    isActive: boolean
  ) => {
    const { data } = await ClassService.updateClassState(
      classData.idCode,
      isActive
    );

    queryClient.invalidateQueries(`getClasses`);
    toast.success(data);
  };

  const handleRequestSort = (property: keyof Column) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = () => {
    if (orderBy && order) {
      return UIrows?.slice().sort((a, b) => {
        let aValue, bValue;
        if (
          orderBy === ("creatorName" as keyof Column) ||
          orderBy === ("creatorEmail" as keyof Column)
        ) {
          aValue = a["creator" as keyof ClassRespData];
          bValue = b["creator" as keyof ClassRespData];
        } else {
          aValue = a[orderBy as keyof ClassRespData];
          bValue = b[orderBy as keyof ClassRespData];
        }

        console.log(typeof aValue);
        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (orderBy === ("creatorName" as keyof Column)) {
          return order === "asc"
            ? aValue.fullname.localeCompare(bValue.fullname)
            : bValue.fullname.localeCompare(aValue.fullname);
        }
        if (orderBy === ("creatorEmail" as keyof Column)) {
          return order === "asc"
            ? aValue.email.localeCompare(bValue.email)
            : bValue.email.localeCompare(aValue.email);
        }
        return order === "asc"
          ? (aValue as any) - (bValue as any)
          : (bValue as any) - (aValue as any);
      });
    }
    return UIrows;
  };

  return (
    <div>
      {UIrows && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "100vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      {column.sortable ? (
                        <TableSortLabel
                          sx={{
                            "&.MuiTableSortLabel-root": {
                              color: "white",
                            },
                            "&.MuiTableSortLabel-root:hover": {
                              color: "white",
                            },
                            "&.Mui-active": {
                              color: "white",
                            },
                            "& .MuiTableSortLabel-icon": {
                              color: "white !important",
                            },
                          }}
                          active={orderBy.includes(column.id)}
                          direction={
                            orderBy.includes(column.id) ? order : "asc"
                          }
                          onClick={() =>
                            handleRequestSort(column.id as keyof Column)
                          }
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows() &&
                  sortedRows()!
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.idCode}
                        >
                          <TableCell align={"right"}>{row.idCode}</TableCell>
                          <TableCell align={"right"}>{row.title}</TableCell>
                          <TableCell align={"right"}>
                            {row.created_at.toDateString()}
                          </TableCell>
                          <TableCell align={"center"}>
                            {row.creator.fullname}
                          </TableCell>
                          <TableCell align={"right"}>
                            {row.creator.email}
                          </TableCell>
                          <TableCell align={"right"}>
                            {row.description}
                          </TableCell>
                          <TableCell align={"right"}>
                            <div className="flex flex-row item-center justify-center">
                              {row.isActive ? (
                                <ShieldCheck color="green" />
                              ) : (
                                <ShieldX color="red" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell align={"left"}>
                            <div className="flex flex-row items-center justify-center gap-4">
                              {row.isActive ? (
                                <button
                                  onClick={() => handleSetUserState(row, false)}
                                  className="bg-red-500 p-2 rounded-xs font-bold text-white"
                                >
                                  Disabled
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleSetUserState(row, true)}
                                  className="bg-blue-500 p-2 rounded-xs font-bold text-white"
                                >
                                  Active
                                </button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={sortedRows()?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
}
