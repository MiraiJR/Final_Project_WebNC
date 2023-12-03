import { createContext, useReducer } from "react";
import LoginForm from "./LoginForm";
import GetEmail from "./GetEmail";
import WaitingVerifyEmail from "./WaitingVerifyEmail";
import { authReducer, AuthAction, AuthState } from "./authReducer";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/shared/services/AuthService";
import JwtStorage from "@/shared/storages/JwtStorage";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CodeResponse } from "@/shared/utils/codeResponse";

interface EmailContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const emailContext = createContext<EmailContextProps | undefined>(
  undefined
);

const LoginPage = () => {
  const initialState: AuthState = {
    isEmail: true,
    email: "",
    isVerify: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const loginSocial = async (dataReq: RegisterWithSocialAcount) => {
      try {
        const { data } = await AuthService.loginSocial(dataReq);
        console.log("data: ", data);
        if (data === null) {
          console.log("wait for verify your email");
          dispatch({ type: "CHECK_VERIFY" });
        }

        toast.success("Login successfully!");
        JwtStorage.setToken(data);
        navigate("/");
      } catch (error: any) {
        if (
          error.statusCode === 400 &&
          error.message === CodeResponse.NEW_ACCOUNT_NOT_FOUND_EMAIL
        ) {
          dispatch({ type: "TOGGLE_FORM" });
          return;
        }

        toast.error(error.message);
      }
    };

    if (isAuthenticated && user) {
      const dataReq: RegisterWithSocialAcount = {
        email: user.email ?? state.email ?? null,
        fullname: user.name!,
        socialId: user.sub!.split("|")[1].trim(),
        socialType: user.sub!.split("|")[0].trim(),
      };
      console.log(dataReq);
      loginSocial(dataReq);
    }
  }, [isAuthenticated, user, dispatch, state.email]);
  return (
    <emailContext.Provider value={{ state, dispatch }}>
      {state.isEmail ? (
        <LoginForm />
      ) : state.email === "" && !state.isVerify ? (
        <GetEmail />
      ) : (
        <WaitingVerifyEmail />
      )}
    </emailContext.Provider>
  );
};

export default LoginPage;
