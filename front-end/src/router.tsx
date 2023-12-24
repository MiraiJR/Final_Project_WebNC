import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./application/auth-page/register/page";
import LoginPage from "./application/auth-page/login/page";
import ForgotPasswordPage from "./application/auth-page/forgot-password/page";
import ChangePasswordPage from "./application/auth-page/change-password/page";
import AuthGuard from "./shared/components/guards/AuthGuard";
import Root, { loader as rootLoader } from "./application/root/Root";
import ClassList from "./application/class-page/ClassList";
import ClassDetail, {
  classDetailLoader,
} from "./application/class-detail/ClassDetail";
import ClassFeed from "./application/class-detail/class-detail-feed/ClassFeed";
import HomePage from "./application/home-page/page";
import { createClassAction } from "./application/root/Navbar/ClassFormDialog/CreateClassFormDialog";
import { joinClassAction } from "./application/root/Navbar/ClassFormDialog/JoinClassFormDialog";
import MemberList, {
  memberListLoader,
} from "./application/class-detail/class-detail-memberList/MemberList";
import { joinClassLoader } from "./application/join-page/JoinPage";
import AcceptInvitingDialog from "./application/join-page/AcceptInvitePage";
import GradePage from "./application/class-detail/grade-page/page";
import UpdateProfilePage, { updateProfileAction } from "./application/profile-page/UpdateProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/class",
    element: <Root></Root>,
    loader: rootLoader,
    action: createClassAction,
    children: [
      { index: true, element: <ClassList /> },
      {
        path: ":classID",
        element: <ClassDetail></ClassDetail>,
        loader: classDetailLoader,
        children: [
          { index: true, element: <ClassFeed></ClassFeed> },
          {
            path: "list",
            element: <MemberList></MemberList>,
            loader: memberListLoader,
          },
          {
            path: "grade",
            element: <GradePage />,
          },
          {
            path: "feed",
            element: <ClassFeed></ClassFeed>,
            children: [{
                path:"/review/:reviewid",
            }] 
          }
        ],
      },
    ],
  },
  {
    path: "/join/:classID",
    action: joinClassAction,
    loader: joinClassLoader,
  },
  {
    path: "/acceptInvite",
    element: <AcceptInvitingDialog></AcceptInvitingDialog>,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/profile",
    element: <Root></Root>,
    loader: rootLoader,
    children: [
      {
        path:"update",
        element: <UpdateProfilePage></UpdateProfilePage>,
        action: updateProfileAction,
      }
    ]
  },
  {
    path: "auth",
    children: [
      {
        path: "register",
        element: (
          <AuthGuard>
            <RegisterPage />
          </AuthGuard>
        ),
      },
      {
        path: "sign-in",
        element: (
          <AuthGuard>
            <LoginPage />
          </AuthGuard>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <AuthGuard>
            <ForgotPasswordPage />
          </AuthGuard>
        ),
      },
      {
        path: "change-password",
        element: (
          <AuthGuard>
            <ChangePasswordPage />
          </AuthGuard>
        ),
      },
    ],
  },
]);

export default router;
