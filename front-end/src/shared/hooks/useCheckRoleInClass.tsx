import { useState, useEffect } from "react";
import { UserRole } from "../types/UserRole";
import ClassService from "../services/ClassService";

const useCheckRoleInClass = (classId: string) => {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const joinClass = async (classId: string) => {
      if (!classId) {
        return;
      }

      const { data } = await ClassService.joinClass(classId);
      setRole(data.role);
      return data;
    };
    joinClass(classId);
  }, []);

  return role;
};

export default useCheckRoleInClass;
