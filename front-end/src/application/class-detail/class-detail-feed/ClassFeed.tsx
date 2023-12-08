import { MAIN_COLOR } from "@/shared/utils/constant";
import Box from "@mui/material/Box";
import GradeStructure from "./GradeStructure";
import GradeReview from "./GradeReview";

export default function ClassFeed() {
  return (
    <Box width="100%" maxWidth="1000px" className="flex flex-col">
      <Box
        width="100%"
        height="150px"
        borderRadius="10px"
        padding="10px"
        margin="10px 0"
        className="relative"
        bgcolor={MAIN_COLOR}
      >
        <div className="absolute bottom-4 left-4">
          <p className="text-4xl">WEB NÂNG CAO</p>
          <p className="text-xl">abc def ghz</p>
        </div>
      </Box>
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
    </Box>
  );
}
