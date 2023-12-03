import { useContext } from "react";
import RegisterForm from "./RegisterForm";
import GetEmail from "../auth-component/GetEmail";
import WaitingVerifyEmail from "../auth-component/WaitingVerifyEmail";
import { authContext } from "@/shared/components/providers/AuthProvider";
import {
  authReducer,
  AuthAction,
  AuthState,
} from "../auth-component/authReducer";
interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}
const RegisterPage: React.FC = () => {
  const { state, dispatch } = useContext<AuthContextProps>(authContext)!;

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
