import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { getClasses } from "@/shared/services/QueryService";
import { ShieldCheck, ShieldX } from "lucide-react";
import { toast } from "react-toastify";
import { ClassRespData } from "@/shared/types/Resp/ClassResp";
import ClassService from "@/shared/services/ClassService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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
}

const columns: readonly Column[] = [
  {
    id: "idCode",
    label: "idCode",
    minWidth: 170,
    align: "right",
  },
  {
    id: "title",
    label: "title",
    minWidth: 170,
    align: "right",
  },
  {
    id: "created_at",
    label: "created_at",
    minWidth: 170,
    align: "right",
  },
  {
    id: "creatorName",
    label: "creatorName",
    minWidth: 170,
    align: "center",
  },
  {
    id: "creatorEmail",
    label: "creatorEmail",
    minWidth: 170,
    align: "right",
  },
  {
    id: "description",
    label: "description",
    minWidth: 170,
    align: "right",
  },
  {
    id: "isActive",
    label: "isActive",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "action",
    minWidth: 170,
    align: "center",
  },
];

interface Props {
  searchText: string;
}

export default function ListClassesTable({ searchText }: Props) {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
  let UIrows: ClassRespData[] | undefined;
  if (searchText !== "") {
    UIrows = rows?.filter((row) => {
      console.log(row.title.toLowerCase());
      console.log(searchText.toLowerCase());
      console.log(row.title.toLowerCase().includes(searchText.toLowerCase()));
      return row.title.toLowerCase().includes(searchText.toLowerCase());
    });
  } else {
    UIrows = rows;
  }

  const handleSetUserState = async (
    classData: ClassRespData,
    isActive: boolean
  ) => {
    console.log(isActive);
    const { data } = await ClassService.updateClassState(
      classData.idCode,
      isActive
    );

    queryClient.invalidateQueries(`getClasses`);
    toast.success(data);
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
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {UIrows &&
                  UIrows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.idCode}
                      >
                        <TableCell align={"right"}>{row.idCode}</TableCell>
                        <TableCell align={"right"}>{row.title}</TableCell>
                        <TableCell align={"right"}>{row.create_at}</TableCell>
                        <TableCell align={"center"}>
                          {row.creator.fullname}
                        </TableCell>
                        <TableCell align={"right"}>
                          {row.creator.email}
                        </TableCell>
                        <TableCell align={"right"}>{row.description}</TableCell>
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
            count={UIrows.length}
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
