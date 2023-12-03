import { useContext } from "react";
import RegisterForm from "./RegisterForm";
import GetEmail from "../auth-component/GetEmail";
import WaitingVerifyEmail from "../auth-component/WaitingVerifyEmail";
import { authContext } from "@/shared/components/providers/AuthProvider";

const RegisterPage: React.FC = () => {
  const { state } = useContext(authContext)!;

  return (
    <>
      {state.isEmail ? (
        <RegisterForm />
      ) : state.email === null && !state.isVerify ? (
        <GetEmail />
      ) : (
        <WaitingVerifyEmail />
      )}
    </>
  );
};

export default RegisterPage;
