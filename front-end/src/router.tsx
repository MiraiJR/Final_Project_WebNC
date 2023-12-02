import { createBrowserRouter, Link } from "react-router-dom";
import RegisterPage from "./application/auth-page/register/page";
import LoginPage from "./application/auth-page/login/page";
import ForgotPasswordPage from "./application/auth-page/forgot-password/page";
import ChangePasswordPage from "./application/auth-page/change-password/page";
import AuthGuard from "./shared/components/guards/AuthGuard";
import { useAuth0 } from "@auth0/auth0-react";
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  return isAuthenticated && user && <p>{user.name}</p>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
        <Profile></Profile>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
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
