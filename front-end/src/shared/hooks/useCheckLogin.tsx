import { useState, useEffect } from "react";
import JwtStorage from "../storages/JwtStorage";

const useCheckLogin = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (
      JwtStorage.getToken()?.accessToken &&
      JwtStorage.getToken()?.refreshToken
    ) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
};

export default useCheckLogin;
