import { GradeAssignmentResp } from "../types/Resp/ClassResp";
import ClassService from "./ClassService";
import { GradeService } from "./GradeService";

// dung cho react query
export const getGradeStudentsOfClass = async (
  classId: string
): Promise<GradeStudent[]> => {
  const { data } = await GradeService.getGradeStudentsOfClass(classId);

  return data;
};

export const getGradeStructuresOfClass = async (
  classId: string
): Promise<GradeAssignmentResp[]> => {
  const { data } = await ClassService.getGradeStructure(classId);

  return data.assignments;
};
