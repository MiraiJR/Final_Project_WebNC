import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface UpdateGradeDialogProps {
  open: boolean;
  onClose: () => void;
  info: StudentIdUser[];
}

export default function ListUsersFailMappingDialog({
  open,
  onClose,
  info,
}: UpdateGradeDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>List Users Fail Mapping Student ID</DialogTitle>
      <DialogContent sx={{ minWidth: "500px", marginLeft: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">User Email</TableCell>
              <TableCell align="center">Student ID</TableCell>
              <TableCell align="center">Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info &&
              info.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.studentId}</TableCell>
                  <TableCell align="center">{row.reasonFail}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
