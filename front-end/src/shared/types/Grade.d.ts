type GradeStudent = {
  studentId: string;
  fullname: string;
  scores: Score[];
};

type Score = {
  value: number;
  isFinalized: boolean;
};
