import {
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_PASSWORD,
} from "@/shared/utils/constant";
import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import JwtStorage from "@/shared/storages/JwtStorage";
import { toast } from "react-toastify";
import AdminAuthService from "@/shared/services/AdminSerivce";

const schemaValidation = yup
  .object({
    username: yup
      .string()
      .required("Username is required!")
      .min(3, `Password must be at least ${3} characters long`),
    password: yup
      .string()
      .required("Password is required")
      .min(
        MIN_LENGTH_PASSWORD,
        `Password must be at least ${MIN_LENGTH_PASSWORD} characters long`
      )
      .max(
        MAX_LENGTH_PASSWORD,
        `Password must be at least ${MAX_LENGTH_PASSWORD} characters long`
      ),
  })
  .required();

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminAuthReq>({
    resolver: yupResolver(schemaValidation),
  });
  const onSubmit: SubmitHandler<AdminAuthReq> = async (loginReqData) => {
    try {
      const { data } = await AdminAuthService.login(loginReqData);

      JwtStorage.setToken(data);
      toast.success("Login successfully!");

      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 m-auto p-10 -translate-x-1/2 -translate-y-1/2 border border-slate-400 rounded-xl">
      <h1 className="text-center uppercase text-xl font-bold">Sign in</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 my-10"
      >
        <TextField
          type="username"
          label="Username"
          variant="outlined"
          {...register("username")}
          className="w-[400px]"
          error={errors.username ? true : false}
          helperText={errors.username?.message}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          {...register("password")}
          className="w-[400px]"
          error={errors.password ? true : false}
          helperText={errors.password?.message}
        />
        <div className="flex flex-col items-end gap-2">
          <Button variant="contained" type="submit" className="w-fit">
            Sign In
          </Button>
        </div>
      </form>
      <div>
        <span>You don't have an account?</span>
        <Link className="text-blue-400 ml-2" to={"/register"}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
