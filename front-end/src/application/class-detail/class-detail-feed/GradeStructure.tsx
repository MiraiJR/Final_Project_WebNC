import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
interface TableData {
  name: string;
  grade: number;
}

const GradeStructure = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [rows, setRows] = useState<TableData[] | undefined>([]);
  useEffect(() => {
    const data = [
      { name: "Midterm", grade: 40 },
      { name: "Final", grade: 60 },
      {
        name: "Total",
        grade: 100,
      },
    ];
    // const data = undefined;
    setRows(data);
  }, []);
  let UIrows: TableData[] = [];
  if (rows) {
    UIrows = rows.map((row) => ({ ...row }));
  }
  const handleSaveButton = () => {
    const temp = UIrows.map((row) => ({ ...row }));
    const totalRow = temp.find((row) => row.name === "Total");
    if (totalRow) {
      totalRow.grade =
        temp.reduce((acc, cur) => acc + cur.grade, 0) - totalRow.grade;
    } else {
      temp.push({
        name: "Total",
        grade: temp.reduce((acc, cur) => acc + cur.grade, 0),
      });
    }
    setRows([...temp]);
    // send new structure to backend
    // Todo:

    // set state to not edit
    setIsEdit(false);
  };

  const handleDragEnd = (e: any) => {
    if (!e.destination) return;
    if (e.destination.index === UIrows.length - 1) return;
    let tempData = Array.from(UIrows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows(tempData);
  };
  return (
    <>
      <p className=" text-base m-2 font-bold">Grade Structure</p>
      {rows === undefined ? (
        <div className="flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-alert-octagon"
          >
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <p className="text-4xl m-2">Grade Structure is empty</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p className="font-bold">Assignment</p>
                  </TableCell>
                  <TableCell align="right">
                    <p className="font-bold">Grade</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <Droppable droppableId="droppable-1">
                {(provider) => (
                  <TableBody
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                  >
                    {rows &&
                      UIrows.map((row, index) => (
                        <Draggable
                          key={`${row.name}-${row.grade}`}
                          draggableId={row.name}
                          index={index}
                          isDragDisabled={
                            isEdit
                              ? row.name === "Total"
                                ? true
                                : false
                              : true
                          }
                        >
                          {(provider) => (
                            <TableRow
                              key={`${row.name}-${row.grade}`}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                              {...provider.draggableProps}
                              ref={provider.innerRef}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                {...provider.dragHandleProps}
                              >
                                <TextField
                                  disabled={
                                    isEdit
                                      ? row.name === "Total"
                                        ? true
                                        : false
                                      : true
                                  }
                                  id={`${row.name}-${row.grade}-name`}
                                  className={
                                    row.name === "Total" ? "font-bold" : ""
                                  }
                                  variant="standard"
                                  defaultValue={row.name}
                                  onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    row.name = event.target.value;
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <TextField
                                  disabled={
                                    isEdit
                                      ? row.name === "Total"
                                        ? true
                                        : false
                                      : true
                                  }
                                  id={`${row.name}-${row.grade}-grade`}
                                  className={
                                    row.name === "Total"
                                      ? "font-bold text-right"
                                      : "text-end"
                                  }
                                  variant="standard"
                                  defaultValue={row.grade}
                                  onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    row.grade = Number(event.target.value);
                                  }}
                                />
                              </TableCell>
                              {row.name !== "Total" ? (
                                isEdit ? (
                                  <TableCell align="right">
                                    <Button
                                      color="error"
                                      variant="outlined"
                                      size="small"
                                      hidden={
                                        isEdit
                                          ? row.name === "Total"
                                            ? true
                                            : false
                                          : true
                                      }
                                      onClick={() => {
                                        const temp = UIrows.map((row) => ({
                                          ...row,
                                        }));
                                        temp.splice(UIrows.indexOf(row), 1);
                                        setRows(temp);
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="red"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-trash-2"
                                      >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" x2="10" y1="11" y2="17" />
                                        <line x1="14" x2="14" y1="11" y2="17" />
                                      </svg>
                                    </Button>
                                  </TableCell>
                                ) : null
                              ) : null}
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                    {provider.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </Table>
          </TableContainer>
        </DragDropContext>
      )}
      {isEdit ? (
        <div className="flex justify-between">
          <Button
            variant="contained"
            className="w-fit"
            onClick={() => {
              const temp = UIrows.map((row) => ({ ...row }));
              temp.splice(temp.length - 1, 0, {
                name: `Assignment ${temp.length}`,
                grade: 0,
              });
              setRows(temp);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Add Assignment
          </Button>
          <Button
            variant="contained"
            className="w-fit"
            onClick={handleSaveButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-down-to-line"
            >
              <path d="M12 17V3" />
              <path d="m6 11 6 6 6-6" />
              <path d="M19 21H5" />
            </svg>
            Save
          </Button>
        </div>
      ) : (
        <div className="flex  justify-end">
          <Button
            variant="contained"
            className="w-fit"
            onClick={() => setIsEdit(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pencil mr-2"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            Edit
          </Button>
        </div>
      )}
    </>
  );
};
export default GradeStructure;
