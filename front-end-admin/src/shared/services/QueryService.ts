import { ClassRespData, GradeAssignmentResp } from "../types/Resp/ClassResp";
import ClassService from "./ClassService";
import { GradeService } from "./GradeService";
import UserService from "./UserService";

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

export const getFinalizedGradesOfStudent = async (
  classId: string
): Promise<number[]> => {
  const { data } = await GradeService.getFinalizedGradesOfStudent(classId);

  return data;
};

export const getUsers = async (): Promise<UserManagementResp[]> => {
  const { data } = await UserService.getUsers();

  return data;
};

export const getClasses = async (): Promise<ClassRespData[]> => {
  const { data } = await ClassService.getAllClass();

  return data;
};
