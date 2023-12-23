type CreateClassReq = {
  title: string;
  description: string;
};

type UpdateGrade = {
  structureId: number;
  studentId: string;
  newScore: number;
}

type GradeAssignmentReq = {
  id?: number;
  nameAssignment: string;
  percentScore: number;
  position: number;
};

type GradeStructureReq = {
    assignments: GradeAssignmentResp[];
}