import {
  getFinalizedGradesOfStudent,
  getGradeStructuresOfClass,
} from "@/shared/services/QueryService";
import { GradeAssignmentResp } from "@/shared/types/Resp/ClassResp";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ColumnAssignment from "../grade-page/ColumnAssignment";
import { MAIN_COLOR } from "@/shared/utils/constant";

const GradeStudent = () => {
  const { classID } = useParams<string>();
  const { data: gradeStructures } = useQuery<GradeAssignmentResp[]>(
    `getGradeStructuresOfClass`,
    () => getGradeStructuresOfClass(String(classID)),
    {
      enabled: !!classID,
    }
  );
  const { data: grades } = useQuery<number[]>(
    `getFinalizedGradesOfStudent`,
    () => getFinalizedGradesOfStudent(String(classID)),
    {
      enabled: !!classID,
    }
  );

  const calculateAverageGrade = (
    grades: number[],
    gradeStructures: GradeAssignmentResp[]
  ): number => {
    let averageGrade = 0;
    for (const _index in gradeStructures) {
      averageGrade +=
        (gradeStructures[_index].percentScore / 100) * grades[_index];
    }

    return averageGrade;
  };

  return (
    <div className="w-full">
      <div>
        <table className="border-2 min-w-full table-fixed">
          <thead className={`border-b-2 bg-[${MAIN_COLOR}]`}>
            <tr>
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
            <tr className="border-b-2">
              {gradeStructures &&
                grades &&
                grades.map((grade, _index) => (
                  <td className="border-r-2 p-2" key={_index}>
                    {grade}
                  </td>
                ))}
            </tr>
            <tr className="border-b-2">
              <td colSpan={gradeStructures?.length}>
                <div className="py-2 font-bold flex flex-row justify-end">
                  {grades &&
                    gradeStructures &&
                    calculateAverageGrade(grades, gradeStructures).toPrecision(
                      3
                    )}
                  <span className="ml-10">Average Score</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeStudent;
