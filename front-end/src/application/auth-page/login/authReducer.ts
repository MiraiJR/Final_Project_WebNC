// authReducer.ts
export interface AuthState {
    isEmail: boolean;
    email: string;
  }
  
  export type AuthAction =
    | { type: "TOGGLE_FORM" }
    | { type: "SET_EMAIL"; payload: string };
  
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
      default:
        return state;
    }
  };
  