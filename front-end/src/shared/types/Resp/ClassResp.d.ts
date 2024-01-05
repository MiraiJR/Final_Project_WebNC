import { UserRole } from "../UserRole";

type ClassRespData = {
  title: string;
  creator: {
    id: number;
    fullname: string;
    email: string;
  };
  idCode: string;
  role: UserRole;
  description: string;
  isActive: boolean;
};

type ClassDetailResp = {
  title: string;
  creatorId: number;
  idCode: string;
  roleToken: string;
  description: string;
  role: UserRole;
};

type ClassMemberResp = {
  email: string;
  fullname: string;
  id: number;
  studentId: string;
};

type ClassMembersListResp = {
  students: ClassMemberResp[];
  teachers: ClassMemberResp[];
};

type GradeAssignmentResp = {
  id: number;
  nameAssignment: string;
  percentScore: number;
  position: number;
};

type GradeStructureResp = {
    assignments: GradeAssignmentResp[];
}

type GradeReviewComment = {
  content: string;
  createdAt: Date;
  author: UserRespData;
  reviewId: number;
}

  type GradeReviewResp = {
    id: number;
    structureId: number;
    studentId: string;
    studentName: string;
    nameAssignment: string;
    currPercentScore: number;
    expectPercentScore: number;
    explain: string;
    comment: GradeReviewComment[];
    isFinalized: boolean;
  }
