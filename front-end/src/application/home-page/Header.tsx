import logo from "@/shared/assets/logo.png";
import person from "@/shared/assets/header-pic.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const handleOnClick = () => {
    const cookies = new Cookies(null, { path: "/" });

    cookies.remove("accessToken", { path: "/", expires: new Date(0) });
    cookies.remove("refreshToken", { path: "/", expires: new Date(0) });

    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  return (
    <button
      className="h-fit bg-violet-700 text-white rounded-lg px-4 py-3 text-base"
      onClick={handleOnClick}
    >
      Log Out
    </button>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="container mx-auto">
      <nav className="flex flex-row justify-between items-center">
        <img className="w-[20%]" src={logo} alt="Logo TripleH Learning" />

        <div className="flex flex-row gap-4">
          <ul className="flex flex-row items-center gap-10 text-base">
            <li>
              <Link to={""}>Home</Link>
            </li>
            <li>
              <Link to={""}>About us</Link>
            </li>
          </ul>

          <div className="flex flex-row gap-4 items-center">
            {isAuthenticated && user ? (
              <LogoutButton />
            ) : (
              <>
                <button
                  className="h-fit bg-white text-black rounded-lg px-4 py-3 text-base"
                  onClick={() => navigate("/auth/sign-in")}
                >
                  Sign in
                </button>
                <button
                  className="h-fit bg-violet-700 text-white rounded-lg px-4 py-3 text-base"
                  onClick={() => navigate("/auth/register")}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-7">
          <h1 className="text-xl font-bold">
            <strong className="text-red-400">Studying</strong> Online is now
            much easier
          </h1>
          <h2 className="text-base">
            Skilline is an interesting platform that will teach you in more an
            interactive way
          </h2>
          <div>
            <button className="bg-orange-700 text-white py-4 px-10 rounded-lg text-base">
              Join for free
            </button>
          </div>
        </div>
        <img src={person} className="w-[800px]" />
      </div>
    </div>
  );
};

export default Header;
