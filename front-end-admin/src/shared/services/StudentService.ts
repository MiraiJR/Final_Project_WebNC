import axiosClient from "../libs/axios";

const StudentService = {
  uploadStudentListCsv: (formData: FormData) =>
    axiosClient.post<string>(`/students/upload`, formData),
};

export default StudentService;
