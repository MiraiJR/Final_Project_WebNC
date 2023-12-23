import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import ClassService from "@/shared/services/ClassService";
import { ClassDetailResp } from "@/shared/types/Resp/ClassResp";
import { toast } from "react-toastify";
import RoleTokenStorage from "@/shared/storages/RoleTokenStorage";
import useCheckRoleInClass from "@/shared/hooks/useCheckRoleInClass";
import { UserRole } from "@/shared/types/UserRole";

enum TagValue {
  Feed = "feed",
  List = "list",
  Grade = "grade",
}

type ClassDetail = {
  title: string;
  creatorId: number;
  idCode: string;
  roleToken: string;
  role:UserRole;
};

// Hàm kiểm tra xem chuỗi có trong enum hay không
function isStringInEnum(value: string): value is TagValue {
  return Object.values(TagValue).includes(value as TagValue);
}

export default function ClassDetail() {
  const classDetail: ClassDetail = useLoaderData() as ClassDetail;
  let { classID } = useParams();
  let { pathname } = useLocation();
  const pathnameSplit = pathname.split("/");
  const role = classDetail.role;

  function initValue(): string {
    console.log(1);
    if (pathnameSplit.length <= 3) {
      return TagValue.Feed;
    }
    if (isStringInEnum(pathnameSplit[3])) {
      return pathnameSplit[3];
    } else {
      return "";
    }
  }

  let link = `/class/${classID}`;
  const [value, setValue] = useState<TagValue | string>(initValue());
  const handleChange = (_event: React.SyntheticEvent, newValue: TagValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs onChange={handleChange} value={value}>
        <Tab value={TagValue.Feed} label="Feed" component={Link} to={link} />
        <Tab
          value={TagValue.List}
          label="Member"
          component={Link}
          to={link + `/${TagValue.List}`}
        />
        {(role === UserRole.GV || role===UserRole.AD) && (
          <Tab
            value={TagValue.Grade}
            label="Grade"
            component={Link}
            to={link + `/${TagValue.Grade}`}
          />
        )}
      </Tabs>
      <Box margin="20px" display="flex" justifyContent="center">
        <Outlet context={classDetail}></Outlet>
      </Box>
    </Box>
  );
}

export async function classDetailLoader({ params }: any): Promise<ClassDetail> {
  try {
    const classDetailResp: ClassDetailResp = (
      await ClassService.getClassDetail(params.classID)
    ).data;
    RoleTokenStorage.deleteToken();
    RoleTokenStorage.setToken(classDetailResp.roleToken);
    const classDetail: ClassDetail = classDetailResp as ClassDetail;
    return classDetail;
  } catch (e: any) {
    toast.error(e.message);
    throw new Error(e);
  }
}

export function useClassDetail(): ClassDetail {
  return useOutletContext<ClassDetail>();
}
