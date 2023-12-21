import UserService from "@/shared/services/UserService";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface itemProps {
  user: UserManagementResp;
}

const LockedDurationOption = ({ user }: itemProps) => {
  const queryClient = useQueryClient();
  const [isShowOptionLock, setIsShowOptionLock] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<string>("");

  const handleLockUser = async (event: SelectChangeEvent) => {
    const duration = event.target.value;
    setSelectedDuration(duration as string);

    const { data } = await UserService.lockUser({
      userId: user.id,
      duration: parseInt(duration),
    });

    queryClient.invalidateQueries(`getUsers`);
    toast.success(data);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsShowOptionLock(true)}
        className="bg-red-500 p-2 rounded-xs font-bold text-white w-fit"
      >
        Lock
      </button>
      {isShowOptionLock && (
        <div className="absolute top-100 z-10 bg-white w-[100px] right-0">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Day</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Day"
              value={selectedDuration}
              onChange={handleLockUser}
            >
              <MenuItem value={10}>5 days</MenuItem>
              <MenuItem value={10}>10 days</MenuItem>
              <MenuItem value={30}>1 tháng</MenuItem>
              <MenuItem value={72}>6 tháng</MenuItem>
              <MenuItem value={365}>1 năm</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default LockedDurationOption;
