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

const sendUserDataToServer = async (userData: RegisterWithSocialAcount) => {
  try {
    const { data } = await AuthService.registerWithSocialAcount(userData);
    JwtStorage.setToken(data);
    toast.success("Login successfully!");
  } catch (error: any) {
    toast.error(error.message);
  }
};

const checkExitAccountForThisSocialAccount = async (
  socialId: string
): Promise<boolean> => {
  try {
    const checkExitAccountReq: IdSocialAcount = {
      socialId: socialId,
    };
    const { data } = await AuthService.isHaveAccount(checkExitAccountReq);
    toast.success("Check exit account successfully!");
    return data;
  } catch (error: any) {
    toast.error(error.message);
    return false;
  }
};

const ListSocialButton = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(emailContext)!;

  const { isAuthenticated, user } = useAuth0();
  console.log(user?.nickname);

  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     checkExitAccountForThisSocialAccount(user.sub!).then((isExit) => {
  //       if (user.email === undefined && state.email === "") {
  //         console.log("doesn't have email");
  //         if (!isExit) {
  //           dispatch({ type: "TOGGLE_FORM" });
  //         }
  //       }
  //       if (user.email !== undefined || state.email !== "") {
  //         console.log("verifyEmail");
  //         const data: LoginSocialReq = {
  //           email: user.email !== undefined ? user.email : state.email,
  //           verifyEmail: user.email !== undefined ? true : false,
  //           fullname: user.name!,
  //           socialId: user.sub!,
  //         };
  //         sendUserDataToServer(data);
  //         navigate("/");
  //       }
  //     });
  //   }
  // }, [isAuthenticated, user, dispatch, state.email]);

  useEffect(() => {
    if (isAuthenticated && user) {
      checkExitAccountForThisSocialAccount(user.sub!).then(async (isExit) => {
        console.log("State of account: ", isExit);
        if (isExit) {
          try {
            const loginSocialReq: IdSocialAcount = {
              socialId: user.sub!,
            };
            const { data } = await AuthService.loginSocial(loginSocialReq);
            JwtStorage.setToken(data);
            toast.success("Login successfully!");
            navigate("/");
          } catch (error: any) {
            toast.error(error.message);
          }
        } else {
          if (user.email === undefined && state.email === "") {
            console.log("doesn't have email");

            dispatch({ type: "TOGGLE_FORM" });
          }
          if (user.email !== undefined || state.email !== "") {
            const data: RegisterWithSocialAcount = {
              email: user.email !== undefined ? user.email : state.email,
              verifyEmail: user.email !== undefined ? true : false,
              fullname: user.name!,
              socialId: user.sub!,
            };
            console.log(data);
            sendUserDataToServer(data);
            if (user.email !== undefined) {
              navigate("/");
            }
          }
        }
      });
    }
  }, [isAuthenticated, user, dispatch, state.email]);
  //   console.log("useEffect called");
  //   if (isAuthenticated && user && user.email === undefined) {
  //     console.log("doesn't have email");
  //     dispatch({ type: "TOGGLE_FORM" });
  //   }
  // }, [isAuthenticated, user, dispatch, state.email]);

  // useEffect(() => {
  //   if (
  //     isAuthenticated &&
  //     user &&
  //     (user.email !== undefined || state.email !== "")
  //   ) {
  //     console.log("verifyEmail");
  //     const data: LoginSocialReq = {
  //       email: user.email !== undefined ? user.email : state.email,
  //       verifyEmail: user.email !== undefined ? true : false,
  //       fullname: user.name!,
  //       socialId: user.sub!,
  //     };
  //     sendUserDataToServer(data);
  //     navigate("/");
  //   }
  // }, [isAuthenticated, user, state.email]);

  return (
    <>
      <GoogleButton></GoogleButton>
      <FacebookButton></FacebookButton>
    </>
  );
};

export default ListSocialButton;
