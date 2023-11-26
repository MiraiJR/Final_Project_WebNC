import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_PASSWORD,
} from "@/shared/utils/constant";

interface IFormInput {
  password: string;
  confirmPassword: string;
}

const schemaValidation = yup
  .object({
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
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(
        MIN_LENGTH_PASSWORD,
        `Confirm password must be at least ${MIN_LENGTH_PASSWORD} characters long`
      )
      .max(
        MAX_LENGTH_PASSWORD,
        `Confirm password must be at least ${MAX_LENGTH_PASSWORD} characters long`
      )
      .oneOf([yup.ref("password"), ""], "Confirm password must match"),
  })
  .required();

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaValidation),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // call api
    console.log(data);
  };

  return (
    <div className="fixed top-1/2 left-1/2 m-auto p-10 -translate-x-1/2 -translate-y-1/2 border border-slate-400 rounded-xl">
      <h1 className="text-center uppercase text-xl font-bold">
        Change your password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 my-10"
      >
        <TextField
          type="password"
          label="New password"
          variant="outlined"
          {...register("password")}
          className="w-[400px]"
          error={errors.password ? true : false}
          helperText={errors.password?.message}
        />
        <TextField
          type="password"
          label="Confirm new password"
          variant="outlined"
          {...register("confirmPassword")}
          className="w-[400px]"
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword?.message}
        />
        <div className="flex flex-col items-end gap-2">
          <Button variant="contained" type="submit" className="w-fit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
