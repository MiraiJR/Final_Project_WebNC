import { MAIN_COLOR } from "@/shared/utils/constant";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

interface InviteCodeAndLinkBoxProps {
  classId: string;
}

export default function InviteCodeAndLinkBox({
  classId,
}: InviteCodeAndLinkBoxProps) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(classId);
    toast.info("Class code is copied");
  };

  const handleLinkInvite = () => {
    const rootUrl = window.location.origin;
    const link = rootUrl + "/join/" + classId;
    navigator.clipboard.writeText(link);
    toast.info("Class link invite is copied");
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        variant="contained"
        sx={{
          backgroundColor: MAIN_COLOR,
          color: "black",
          ":hover": { backgroundColor: "#F2DDE2" },
        }}
        onClick={handleCopyCode}
      >
        Copy Class Code
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: MAIN_COLOR,
          color: "black",
          ":hover": { backgroundColor: "#F2DDE2" },
        }}
        onClick={handleLinkInvite}
      >
        Copy Class Invite Link
      </Button>
    </div>
  );
}
