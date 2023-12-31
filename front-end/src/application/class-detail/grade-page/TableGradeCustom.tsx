import {
  getGradeStructuresOfClass,
  getGradeStudentsOfClass,
} from "@/shared/services/QueryService";
import { GradeAssignmentResp } from "@/shared/types/Resp/ClassResp";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import RowScore from "./RowScore";
import ColumnAssignment from "./ColumnAssignment";

const TableGradeCustom = () => {
  const { classID } = useParams();

  const { data: gradeStudents } = useQuery<GradeStudent[]>(
    [`getGradeStudentsOfClass`, classID],
    () => getGradeStudentsOfClass(String(classID)),
    {
      enabled: !!classID,
    }
  );

  const { data: gradeStructures } = useQuery<GradeAssignmentResp[]>(
    [`getGradeStructuresOfClass`, classID],
    () => getGradeStructuresOfClass(String(classID)),
    {
      enabled: !!classID,
    }
  );

  const calculateAverageGrade = (
    gradeStudent: GradeStudent,
    gradeStructures: GradeAssignmentResp[]
  ): number => {
    let averageGrade = 0;
    for (const _index in gradeStructures) {
      averageGrade +=
        (gradeStructures[_index].percentScore / 100) *
        gradeStudent.scores[_index].value;
    }

    return averageGrade;
  };

  return (
    <div>
      <table className="border-2 min-w-full table-fixed">
        <thead className="border-b-2">
          <tr>
            <th className="text-left p-4 border-l-2">
              <div className="flex flex-row items-center justify-between">
                <h2>StudentId</h2>
              </div>
            </th>
            <th className="text-left p-4 border-l-2">
              <div className="flex flex-row items-center justify-between">
                <h2>Fullname</h2>
              </div>
            </th>
            <th className="text-left p-4 border-l-2">
              <div className="flex flex-row items-center justify-between">
                <h2>Total grade</h2>
              </div>
            </th>
            {gradeStructures &&
              gradeStructures.map((gradeStructure) => (
                <ColumnAssignment
                  gradeStructure={gradeStructure}
                  key={gradeStructure.id}
                />
              ))}
          </tr>
        </thead>
        <tbody className="border-b-2">
          {gradeStructures &&
            gradeStudents &&
            gradeStudents.map((gradeStudent, _index) => (
              <tr key={_index} className="border-b-2">
                <td className="border-r-2 p-2">{gradeStudent.studentId}</td>
                <td className="border-r-2 p-2">{gradeStudent.fullname}</td>
                <td className="border-r-2 p-2">
                  {calculateAverageGrade(
                    gradeStudent,
                    gradeStructures
                  ).toPrecision(3)}
                </td>
                {gradeStudent.scores.map((score, _indexRowScore) => (
                  <td className="border-r-2 p-2" key={_indexRowScore}>
                    <RowScore
                      score={score}
                      studentId={gradeStudent.studentId}
                      gradeStructureId={gradeStructures[_indexRowScore].id}
                    />
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableGradeCustom;
