type GradeStudent = {
  studentId: string;
  scores: number[];
};

type GradeStudentResp = {
  studentId: string;
  fullname: string;
  scores: Score[];
};

type Score = {
  value: number;
  isFinalized: boolean;
};

type GradeStudentInAssignment = {
  studentId: string;
  score: number;
};
