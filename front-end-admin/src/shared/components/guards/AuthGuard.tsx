import useCheckLogin from "@/shared/hooks/useCheckLogin";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useCheckLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLogin]);

  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default AuthGuard;
