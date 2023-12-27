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

  function tableData(){
    if(gradeStructures ==null){
      return [];
    }
    const tableData = [];
    for(let i = 0; i<gradeStructures.length;i++){
      const gradeStructure = gradeStructures[i];;
      const grade = (grades!=null && grades[i] !== undefined) ? grades[i] : null;
      tableData.push({
        gradeStructure,
        grade,
      })
    }
    return tableData;
  } 

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
              <th className="border-r-2 p-2 w-3/5">Assignment</th>
              <th className="border-r-2 p-2">Score</th>
            </tr>
          </thead>
          <tbody className="border-b-2">
            {gradeStructures &&
              tableData().map(({gradeStructure,grade},_index) => (
                <tr className="border-b-2" key={gradeStructure.id}>
                  <ColumnAssignment
                    gradeStructure={gradeStructure}
                    key={gradeStructure.id}
                  />
                  <td className="border-x-2 border-b-2 p-2 text-center" key={_index}>
                    {grade}
                  </td>
                </tr>
            ))}
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
