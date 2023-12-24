import {
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_PASSWORD,
} from "@/shared/utils/constant";
import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import AuthService from "@/shared/services/AuthService";
import JwtStorage from "@/shared/storages/JwtStorage";
import { toast } from "react-toastify";
import ListSocialButton from "../auth-component/ListSocialButton";
import { useGlobalState } from "@/shared/storages/GlobalStorage";

const schemaValidation = yup
  .object({
    email: yup.string().required("Email is required!").email("Invalid email!"),
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
  const { setIsLogin } = useGlobalState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next: string = searchParams.get("next") as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninReq>({
    resolver: yupResolver(schemaValidation),
  });
  const onSubmit: SubmitHandler<SigninReq> = async (loginReqData) => {
    try {
      const { data } = await AuthService.sigin(loginReqData);

      JwtStorage.setToken(data);
      toast.success("Login successfully!");
      if (next) {
        navigate(next);
      }
      setIsLogin(true);
      navigate("/class");
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
          type="email"
          label="Email"
          variant="outlined"
          {...register("email")}
          className="w-[400px]"
          error={errors.email ? true : false}
          helperText={errors.email?.message}
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
          <Link className="text-blue-400" to={"/auth/forgot-password"}>
            Forgot password?
          </Link>
          <Button variant="contained" type="submit" className="w-fit">
            Sign In
          </Button>
        </div>
      </form>
      <div>
        <span>You don't have an account?</span>
        <Link className="text-blue-400 ml-2" to={"/auth/register"}>
          Register
        </Link>
      </div>
      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
          Hoặc
        </p>
      </div>
      <ListSocialButton></ListSocialButton>
    </div>
  );
};

export default LoginForm;
