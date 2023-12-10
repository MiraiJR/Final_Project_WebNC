import { UserRole } from "../UserRole";

type SendInviteMailReq = {
    emails: string[];
    role: UserRole;
  };