import { useState, useEffect } from "react";
import JwtStorage from "../storages/JwtStorage";

const useCheckLogin = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (
      JwtStorage.getToken()?.accessToken !== undefined &&
      JwtStorage.getToken()?.refreshToken !== undefined
    ) {
      console.log(JwtStorage.getToken()?.accessToken);
      console.log("login");
      setLoggedIn(true);
    } else {
      console.log("not login");
      setLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
};

export default useCheckLogin;
