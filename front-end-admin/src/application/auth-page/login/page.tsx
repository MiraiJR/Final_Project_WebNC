import { useEffect } from "react";
import LoginForm from "./LoginForm";
import useCheckLogin from "@/shared/hooks/useCheckLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const isLogin = useCheckLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
