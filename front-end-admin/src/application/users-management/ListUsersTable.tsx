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
import { getUsers } from "@/shared/services/QueryService";
import { CheckCircle2, ShieldCheck, ShieldX, XCircle } from "lucide-react";
import { Helper } from "@/shared/utils/heper";
import UserService from "@/shared/services/UserService";
import { toast } from "react-toastify";
import LockedDurationOption from "./LockedDurationOption";

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
    | "id"
    | "email"
    | "fullname"
    | "facebookId"
    | "googleId"
    | "studentId"
    | "isBanned"
    | "locked"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "id", minWidth: 10 },
  {
    id: "fullname",
    label: "fullname",
    minWidth: 170,
    align: "right",
  },
  {
    id: "email",
    label: "email",
    minWidth: 170,
    align: "right",
  },
  {
    id: "studentId",
    label: "studentId",
    minWidth: 170,
    align: "right",
  },
  {
    id: "facebookId",
    label: "facebookId",
    minWidth: 170,
    align: "center",
  },
  {
    id: "googleId",
    label: "googleId",
    minWidth: 170,
    align: "center",
  },
  {
    id: "isBanned",
    label: "isBanned",
    minWidth: 170,
    align: "center",
  },
  {
    id: "locked",
    label: "locked",
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

export default function ListUsersTable() {
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

  const { data: rows } = useQuery<UserManagementResp[]>(`getUsers`, () =>
    getUsers()
  );

  const handleUnbanUser = async (user: UserManagementResp) => {
    const { data } = await UserService.banOrUnbanUser({
      userId: user.id,
      isBan: false,
    });

    await queryClient.invalidateQueries(`getUsers`);
    toast.success(data);
  };

  const handleBanUser = async (user: UserManagementResp) => {
    const { data } = await UserService.banOrUnbanUser({
      userId: user.id,
      isBan: true,
    });

    await queryClient.invalidateQueries(`getUsers`);
    toast.success(data);
  };

  const handleUnlockUser = async (user: UserManagementResp) => {
    const { data } = await UserService.unlockUser({
      userId: user.id,
    });

    await queryClient.invalidateQueries(`getUsers`);
    toast.success(data);
  };

  return (
    <div>
      {rows && (
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align={"right"}>{row.id}</TableCell>
                        <TableCell align={"right"}>{row.email}</TableCell>
                        <TableCell align={"right"}>{row.fullname}</TableCell>
                        <TableCell align={"right"}>{row.studentId}</TableCell>
                        <TableCell>
                          <div className="flex flex-row item-center justify-center">
                            {row.facebookId ? (
                              <CheckCircle2 color="green" />
                            ) : (
                              <XCircle color="red" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell align={"right"}>
                          <div className="flex flex-row item-center justify-center">
                            {row.googleId ? (
                              <CheckCircle2 color="green" />
                            ) : (
                              <XCircle color="red" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell align={"right"}>
                          <div className="flex flex-row item-center justify-center">
                            {row.isBanned ? (
                              <ShieldX color="red" />
                            ) : (
                              <ShieldCheck color="green" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell align={"left"}>
                          {row.locked ? (
                            <div className="flex flex-col gap-2">
                              <span>
                                Locked at:{" "}
                                <strong>
                                  {Helper.formatDate(row.locked.lockedAt)}
                                </strong>
                              </span>
                              <span>
                                Expired At:{" "}
                                <strong>
                                  {" "}
                                  {Helper.addDate(
                                    row.locked.lockedAt,
                                    row.locked.duration
                                  )}
                                </strong>
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-row items-center justify-center">
                              <ShieldCheck color="green" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell align={"left"}>
                          <div className="flex flex-row items-center justify-center gap-4">
                            {row.isBanned ? (
                              <button
                                onClick={() => handleUnbanUser(row)}
                                className="bg-blue-500 p-2 rounded-xs font-bold text-white"
                              >
                                Unban
                              </button>
                            ) : (
                              <button
                                onClick={() => handleBanUser(row)}
                                className="bg-red-500 p-2 rounded-xs font-bold text-white"
                              >
                                Ban
                              </button>
                            )}
                            {row.locked ? (
                              <button
                                onClick={() => handleUnlockUser(row)}
                                className="bg-blue-500 p-2 rounded-xs font-bold text-white w-fit"
                              >
                                Unlock
                              </button>
                            ) : (
                              <LockedDurationOption user={row} />
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
            count={rows.length}
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
