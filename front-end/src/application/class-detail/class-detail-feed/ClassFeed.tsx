import { MAIN_COLOR } from "@/shared/utils/constant";
import Box from "@mui/material/Box";
import GradeStructure from "./GradeStructure";
import GradeReview from "./GradeReview";
import { useClassDetail } from "../ClassDetail";
import InviteCodeAndLinkBox from "./InviteCodeAndLinkBox";
import { UserRole } from "@/shared/types/UserRole";
import GradeStudent from "./GradeStudent";

export default function ClassFeed() {
  const classDetail = useClassDetail();
  const { role } = classDetail;

  return (
    <div className="w-full max-w-[1000px] grid grid-cols-12 gap-4">
      <div className="col-span-12 flex flex-col gap-2">
        <Box
          width="100%"
          height="150px"
          borderRadius="10px"
          padding="10px"
          className="relative"
          bgcolor={MAIN_COLOR}
        >
          <div className="absolute bottom-4 left-4">
            <p className="text-base font-bold uppercase">{classDetail.title}</p>
          </div>
        </Box>
        {role === UserRole.GV && (
          <div className="flex flex-row">
            <Box
              width="40%"
              height="auto"
              borderRadius="10px"
              padding="10px"
              margin="0 10px 0 0"
              className="relative flex flex-col"
              bgcolor={MAIN_COLOR}
            >
              <GradeStructure />
            </Box>
            <Box
              width="60%"
              height="auto"
              borderRadius="10px"
              padding="10px"
              className="relative"
              bgcolor={MAIN_COLOR}
            >
              <GradeReview />
            </Box>
          </div>
        )}
      </div>

      <div className="col-span-3">
        <div className="w-full">
          <InviteCodeAndLinkBox
            classId={classDetail.idCode}
          ></InviteCodeAndLinkBox>
        </div>
      </div>
      {role === UserRole.HS && (
        <div className="col-span-9">
          <GradeStudent />
        </div>
      )}
    </div>
  );
}
