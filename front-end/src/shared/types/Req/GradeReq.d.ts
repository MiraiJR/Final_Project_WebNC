type UpdateScoreReq = {
  studentId: string;
  gradeStructureId: numebr;
  newScore: number;
};

type UpdateStatusGradeReq = {
  studentId: string;
  gradeStructureId: numebr;
  isFinalized: boolean;
};

type UpdateStatusGradeForAssignmentReq = {
  gradeStructureId: numebr;
  isFinalized: boolean;
};
