import { createBrowserRouter, Link } from "react-router-dom";
import RegisterPage from "./application/auth-page/register/page";
import LoginPage from "./application/auth-page/login/page";
import ForgotPasswordPage from "./application/auth-page/forgot-password/page";
import ChangePasswordPage from "./application/auth-page/change-password/page";
import AuthGuard from "./shared/components/guards/AuthGuard";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return isAuthenticated && user && <p>{user.name}</p>;
};
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { user, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  const handleOnClick = () => {
    const cookies = new Cookies(null, { path: "/" });

    cookies.remove("accessToken", { path: "/", expires: new Date(0) });
    cookies.remove("refreshToken", { path: "/", expires: new Date(0) });

    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  return (
    <>
      {isAuthenticated && user && (
        <Button
          className="fixed top-4 right-4"
          variant="contained"
          color="primary"
          onClick={handleOnClick}
        >
          Log Out
        </Button>
      )}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
        <Profile></Profile>
        <LogoutButton></LogoutButton>
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
