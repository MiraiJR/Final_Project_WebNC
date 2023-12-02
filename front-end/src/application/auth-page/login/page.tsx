import { createContext, useReducer } from "react";
import LoginForm from "./LoginForm";
import GetEmail from "./GetEmail";
import { authReducer, AuthAction, AuthState } from "./authReducer";

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
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <emailContext.Provider value={{ state, dispatch }}>
      {state.isEmail ? <LoginForm /> : <GetEmail />}
    </emailContext.Provider>
  );
};

export default LoginPage;
