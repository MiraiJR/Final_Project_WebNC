import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./application/dashboard-page/page";
import ListUsersTable from "./application/users-management/ListUsersTable";
import ClassManagement from "./application/classes-management/ClassManagement";

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
]);

export default router;
