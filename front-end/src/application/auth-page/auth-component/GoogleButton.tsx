import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/shared/services/AuthService";
import JwtStorage from "@/shared/storages/JwtStorage";
import { toast } from "react-toastify";

const GoogleButton = () => {
  const navigate = useNavigate();
  const { loginWithPopup, user, isAuthenticated } = useAuth0();

  const loginSocial = async (dataReq: RegisterWithSocialAcount) => {
    try {
      const { data } = await AuthService.loginSocial(dataReq);

      toast.success("Login successfully!");
      JwtStorage.setToken(data as AuthToken);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (
    isAuthenticated &&
    user &&
    user.sub!.split("|")[0].trim() === "google-oauth2"
  ) {
    const dataReq: RegisterWithSocialAcount = {
      email: user.email!,
      fullname: user.name!,
      socialId: user.sub!.split("|")[1].trim(),
      socialType: user.sub!.split("|")[0].trim(),
    };
    console.log(dataReq);
    loginSocial(dataReq);
  }
  return (
    <button
      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded 
      cursor-pointer w-full m-3"
      onClick={() =>
        loginWithPopup({
          authorizationParams: {
            connection: "google-oauth2",
          },
        })
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-mail mr-3"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      Log in with Google
    </button>
  );
};

export default GoogleButton;
