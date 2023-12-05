import { useContext } from "react";
import LoginForm from "./LoginForm";
import GetEmail from "../auth-component/GetEmail";
import WaitingVerifyEmail from "../auth-component/WaitingVerifyEmail";

import { authContext } from "@/shared/components/providers/AuthProvider";

const LoginPage = () => {
  const { state } = useContext(authContext)!;

  return (
    <>
      {state.isEmail ? (
        <LoginForm />
      ) : state.email === null && !state.isVerify ? (
        <GetEmail />
      ) : (
        <WaitingVerifyEmail />
      )}
    </>
  );
};

export default LoginPage;
