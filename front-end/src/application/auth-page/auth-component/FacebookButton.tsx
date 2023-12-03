import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/shared/services/AuthService";
import JwtStorage from "@/shared/storages/JwtStorage";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CodeResponse } from "@/shared/utils/codeResponse";
import { emailContext } from "../login/page";
import { Helper } from "@/shared/utils/heper";

const FacebookButton = () => {
  const navigate = useNavigate();
  const { loginWithPopup, user, isAuthenticated } = useAuth0();
  const { state, dispatch } = useContext(emailContext)!;

  const loginSocial = async (dataReq: RegisterWithSocialAcount) => {
    try {
      console.log("data user from fb button: ", user);
      const { data } = await AuthService.loginSocial(dataReq);

      if (
        Helper.isCodeResp(data) &&
        data.code === CodeResponse.NEW_ACCOUNT_NOT_FOUND_EMAIL
      ) {
        dispatch({ type: "TOGGLE_FORM" });
        return;
      }

      toast.success("Login successfully!");
      JwtStorage.setToken(data as AuthToken);
      navigate("/");
    } catch (error: any) {
      if (
        error.statusCode === 400 &&
        error.message === CodeResponse.NEW_ACCOUNT_NOT_FOUND_EMAIL
      ) {
        console.log("moi nhap email address");
        dispatch({ type: "TOGGLE_FORM" });
        console.log(state);
        return;
      }

      toast.error(error.message);
    }
  };

  if (
    isAuthenticated &&
    user &&
    user.sub!.split("|")[0].trim() === "facebook"
  ) {
    const dataReq: RegisterWithSocialAcount = {
      email: user.email ?? null,
      fullname: user.name!,
      socialId: user.sub!.split("|")[1].trim(),
      socialType: user.sub!.split("|")[0].trim(),
    };
    console.log(dataReq);
    loginSocial(dataReq);
  }
  return (
    <button
      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded
       cursor-pointer w-full m-3"
      onClick={() =>
        loginWithPopup({
          authorizationParams: {
            connection: "facebook",
          },
        })
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-facebook mr-3"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
      Log in with Facebook
    </button>
  );
};

export default FacebookButton;