import { Button, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { emailContext } from "./page";

const GetEmail = () => {
  const { state, dispatch } = useContext(emailContext)!;
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // I want to pass the email value to the parent component
    console.log("submitted");
    dispatch({ type: "SET_EMAIL", payload: email });
    console.log(state.email);
  };

  return (
    <div className="fixed top-1/2 left-1/2 m-auto p-10 -translate-x-1/2 -translate-y-1/2 border border-slate-400 rounded-xl">
      <h1 className="text-center uppercase text-xl font-bold">Email</h1>
      <form className="flex flex-col gap-5 my-10" onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          className="w-[400px]"
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
  );
};

export default GetEmail;
