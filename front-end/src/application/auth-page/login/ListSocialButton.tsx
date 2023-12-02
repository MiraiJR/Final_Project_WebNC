import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/shared/services/AuthService";
import JwtStorage from "@/shared/storages/JwtStorage";
import { toast } from "react-toastify";

import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import { useContext } from "react";
import { emailContext } from "./page";

const sendUserDataToServer = async (userData: LoginSocialReq) => {
  try {
    const { data } = await AuthService.loginSocial(userData);
    JwtStorage.setToken(data);
    toast.success("Login successfully!");
  } catch (error: any) {
    toast.error(error.message);
  }
};

const ListSocialButton = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(emailContext)!;

  const { isAuthenticated, user } = useAuth0();
  console.log(user?.nickname);

  useEffect(() => {
    console.log("useEffect called");
    if (isAuthenticated && user && user.email === undefined) {
      console.log("doesn't have email");
      dispatch({ type: "TOGGLE_FORM" });
    }
  }, [isAuthenticated, user, dispatch, state.email]);

  useEffect(() => {
    if (
      isAuthenticated &&
      user &&
      (user.email !== undefined || state.email !== "")
    ) {
      console.log("verifyEmail");
      const data: LoginSocialReq = {
        email: state.email,
        name: user.name!,
        socialId: user.sub!,
      };
      sendUserDataToServer(data);
      navigate("/");
    }
  }, [isAuthenticated, user, state.email]);

  return (
    <>
      <GoogleButton></GoogleButton>
      <FacebookButton></FacebookButton>
    </>
  );
};

export default ListSocialButton;
