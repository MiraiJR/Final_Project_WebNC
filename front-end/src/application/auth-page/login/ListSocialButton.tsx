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
import { CodeResponse } from "@/shared/utils/codeResponse";

const ListSocialButton = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(emailContext)!;
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const loginSocial = async (dataReq: RegisterWithSocialAcount) => {
      try {
        const { data } = await AuthService.loginSocial(dataReq);

        if (data === null) {
          toast.success("Please, check your email to verify!");
          navigate("/auth/sign-in");
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
        email: user.email ?? null,
        fullname: user.name!,
        socialId: user.sub!.split("|")[1].trim(),
        socialType: user.sub!.split("|")[0].trim(),
      };

      loginSocial(dataReq);
    }
  }, [isAuthenticated, user, dispatch, state.email]);

  return (
    <>
      <GoogleButton></GoogleButton>
      <FacebookButton></FacebookButton>
    </>
  );
};

export default ListSocialButton;
