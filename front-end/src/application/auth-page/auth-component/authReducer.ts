// authReducer.ts
export interface AuthState {
    isEmail: boolean;
    email: string | null;
    isVerify: boolean;
  }
  
  export type AuthAction =
    | { type: "TOGGLE_FORM" }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "CHECK_VERIFY"};
  
  export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case "TOGGLE_FORM":
        return {
          ...state,
          isEmail: false,
        };
      case "SET_EMAIL":
        return {
          ...state,
          email: action.payload,
        };
        case "CHECK_VERIFY":
          return {
            ...state,
            isVerify: false,
          };  
      default:
        return state;
    }
  };
  