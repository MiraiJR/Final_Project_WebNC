import { redirect } from "react-router-dom";
import Cookies from "js-cookie";

export function checkLoginLoader(): any {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  if (accessToken && refreshToken) {
    return redirect("/class");
  } else {
    return redirect("/login");
  }
}
