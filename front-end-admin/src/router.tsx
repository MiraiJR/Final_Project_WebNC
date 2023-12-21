import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./application/dashboard-page/page";
import ListUsersTable from "./application/users-management/ListUsersTable";

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
]);

export default router;
