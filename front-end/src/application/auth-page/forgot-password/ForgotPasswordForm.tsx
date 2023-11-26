import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import AuthService from "@/shared/services/AuthService";

interface IFormInput {
  email: string;
}

const schemaValidation = yup
  .object({
    email: yup.string().required("Email is required!").email("Invalid email!"),
  })
  .required();

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaValidation),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (forgotPasswordReqData) => {
    try {
      const { data } = await AuthService.forgotPassowrd(
        forgotPasswordReqData.email
      );

      toast.success(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 m-auto p-10 -translate-x-1/2 -translate-y-1/2 border border-slate-400 rounded-xl">
      <h1 className="text-center uppercase text-xl font-bold">
        Forgot password
      </h1>
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
        <div className="flex flex-col items-end gap-2">
          <Button variant="contained" type="submit" className="w-fit">
            Submit
          </Button>
        </div>
      </form>
      <div>
        <span>You don't have an account?</span>
        <Link className="text-blue-400 ml-2" to={"/auth/register"}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
