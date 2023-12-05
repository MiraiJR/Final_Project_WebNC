import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthService from "@/shared/services/AuthService";
import JwtStorage from "@/shared/storages/JwtStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import WaitingVerifyEmail from "./WaitingVerifyEmail";
import { Helper } from "@/shared/utils/heper";
import { CodeResponse } from "@/shared/utils/codeResponse";

const GetEmail = () => {
  const [email, setEmail] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loginSocial = async (dataReq: RegisterWithSocialAcount) => {
      try {
        const { data } = await AuthService.loginSocial(dataReq);

        if (
          Helper.isCodeResp(data) &&
          data.code === CodeResponse.NEW_ACCOUNT_VERIFY_EMAIL
        ) {
          setIsWaiting(!isWaiting);
          return;
        }

        toast.success("Login successfully!");
        JwtStorage.setToken(data as AuthToken);
        navigate("/");
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    if (isAuthenticated && user) {
      const dataReq: RegisterWithSocialAcount = {
        email: email,
        fullname: user.name!,
        socialId: user.sub!.split("|")[1].trim(),
        socialType: user.sub!.split("|")[0].trim(),
      };
      loginSocial(dataReq);
    }
  };

  return (
    <>
      {!isWaiting ? (
        <div className="fixed top-1/2 left-1/2 m-auto p-10 -translate-x-1/2 -translate-y-1/2 border border-slate-400 rounded-xl">
          <h1 className="text-center uppercase text-xl font-bold">Email</h1>
          <form className="flex flex-col gap-5 my-10" onSubmit={handleSubmit}>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              className="w-[400px]"
              placeholder="Enter your email to verify your account"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex flex-col items-end gap-2">
              <Button variant="contained" type="submit" className="w-fit">
                OK
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <WaitingVerifyEmail></WaitingVerifyEmail>
      )}
    </>
  );
};

export default GetEmail;
