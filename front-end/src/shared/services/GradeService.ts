import axiosClient from "../libs/axios";

export const GradeService = {
  getGradeStudentsOfClass: (classId: string) =>
    axiosClient.get<GradeStudent[]>(`/grades/class/${classId}`),
  uploadGradeStudentListCsv: (formData: FormData) =>
    axiosClient.post<string>(`/grades/upload-grades`, formData),
  updateScoreForSpecificAssignment: (data: UpdateScoreReq) =>
    axiosClient.patch<string>(`/grades/update-score`, data),
  updateStatusForSpecificAssignmentOfStudent: (data: UpdateStatusGradeReq) =>
    axiosClient.patch<string>(`/grades/update-status`, data),
};
