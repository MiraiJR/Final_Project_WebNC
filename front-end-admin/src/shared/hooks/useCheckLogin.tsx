import { useEffect } from "react";
import Cookies from "js-cookie";
import { useGlobalState } from "../storages/GlobalStorage";

const useCheckLogin = () => {
  const { isLogin, setIsLogin } = useGlobalState();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (accessToken && refreshToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return isLogin;
};

export default useCheckLogin;
