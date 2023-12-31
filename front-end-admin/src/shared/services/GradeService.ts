import axiosClient from "../libs/axios";

export const GradeService = {
  getGradeStudentsOfClass: (classId: string) =>
    axiosClient.get<GradeStudent[]>(`/class-grades/${classId}`),
  uploadGradeStudentListCsv: (classId: string, formData: FormData) =>
    axiosClient.post<string>(
      `/class-grades/${classId}/upload-grades`,
      formData
    ),
  updateScoreForSpecificAssignment: (classId: string, data: UpdateScoreReq) =>
    axiosClient.patch<string>(`/class-grades/${classId}/update-score`, data),
  updateStatusForSpecificAssignmentOfStudent: (
    classId: string,
    data: UpdateStatusGradeReq
  ) =>
    axiosClient.patch<string>(
      `/class-grades/${classId}/update-status/students`,
      data
    ),
  updateStatusForColumnAssignment: (
    classId: string,
    data: UpdateStatusGradeForAssignmentReq
  ) =>
    axiosClient.patch<string>(
      `/class-grades/${classId}/update-status/assignments`,
      data
    ),
  uploadGradesForAssignment: (classId: string, formData: FormData) =>
    axiosClient.post<string>(
      `/class-grades/${classId}/upload-grades/assignments`,
      formData
    ),
  getFinalizedGradesOfStudent: (classId: string) =>
    axiosClient.get<number[]>(`/class-grades/${classId}/student`),
};
