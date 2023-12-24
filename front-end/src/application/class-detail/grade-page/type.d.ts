import { UserRole } from "@/shared/types/UserRole";

type CustomMenuItem = {
  label: string;
  handler: Function;
  icon: LucideIcon;
  file: boolean;
  role: UserRole[],
};
