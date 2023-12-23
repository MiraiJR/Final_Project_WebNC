import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./application/dashboard-page/page";
import ListUsersTable from "./application/users-management/ListUsersTable";

import ClassManagement from "./application/classes-management/ClassManagement";

import LoginPage from "./application/auth-page/login/page";
import RegisterPage from "./application/auth-page/register/page";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DashboardPage>
        <ListUsersTable />
      </DashboardPage>
    ),
  },
  {
    path: "/user-management",
    element: (
      <DashboardPage>
        <ListUsersTable />
      </DashboardPage>
    ),
  },
  {
    path: "/class-management",
    element: (
      <DashboardPage>
        <ClassManagement />
      </DashboardPage>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
