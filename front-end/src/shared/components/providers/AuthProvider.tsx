import React, { createContext, useReducer, ReactNode } from "react";
import {
  authReducer,
  AuthAction,
  AuthState,
} from "../../../application/auth-page/auth-component/authReducer";

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const authContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const initialState: AuthState = {
    isEmail: true,
    email: null,
    isVerify: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
