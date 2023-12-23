import { useEffect } from "react";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import useCheckLogin from "@/shared/hooks/useCheckLogin";

const RegisterPage: React.FC = () => {
  const isLogin = useCheckLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
