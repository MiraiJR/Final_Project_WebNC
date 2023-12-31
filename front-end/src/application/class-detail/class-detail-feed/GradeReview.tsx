import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useClassDetail } from "../ClassDetail";
import ClassService from "@/shared/services/ClassService";
import { toast } from "react-toastify";
import { GradeReviewResp } from "@/shared/types/Resp/ClassResp";
import { useNavigate } from "react-router-dom";

const GradeReview = () => {
  const navigate = useNavigate();
  const [reviews, setReview] = useState<GradeReviewResp[]>([]);
  const classDetail = useClassDetail();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await ClassService.getGradeReviews(classDetail.idCode);
        const data = response.data;
        setReview(data);
      };

      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);
  return (
    <>
        <>
          <p className=" text-base m-2 font-bold">Grade Review</p>
          {reviews.length === 0 ? (
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
              <p className="text-4xl m-2">Grade Review is empty</p>
            </div>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className="font-bold">Student</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold">Grade Composition</p>
                    </TableCell>
                    <TableCell align="right">
                      <p className="font-bold">Current Grade</p>
                    </TableCell>
                    <TableCell align="right">
                      <p className="font-bold">Expected Grade</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reviews.map((review, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <p className="font-bold">{review.studentName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold">{review.nameAssignment}</p>
                      </TableCell>
                      <TableCell align="right">
                        <p className="font-bold">{review.currPercentScore}</p>
                      </TableCell>
                      <TableCell align="right">
                        <p className="font-bold">{review.expectPercentScore}</p>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          onClick={() => {
                            navigate(`/class/${classDetail.idCode}/feed/review/${review.id}`)
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
                            className="lucide lucide-eye"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          View Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
    </>
  );
};
export default GradeReview;
