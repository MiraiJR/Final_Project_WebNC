import { Button, Grid, TextField } from "@mui/material";
import { useUser } from "../root/Root";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { ActionFunction, useNavigate, useSubmit } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "@/shared/services/UserService";


interface Inputs{
    fullname: string,
    studentId: string,
}


export default function UpdateProfilePage(){
    const navigate = useNavigate();
    const user = useUser() as UserRespData;
    const submit = useSubmit();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        criteriaMode: "firstError",
    })

    const onSubmit =  (data:Inputs) => {
        console.log(user.fullname)
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        submit(formData,{method : 'patch', action: '/profile/update'})
    }
    

    return(
        <Box>
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Update User Profile</h2>
                <TextField
                    {...register("fullname",{
                        required: 'This Field is required',
                    })}
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    margin="normal"
                    name="fullname"
                    type="text"
                    defaultValue={user.fullname}
                />
                <p className='ml-10 text-red-500'>{errors.fullname?.message} </p>
                <TextField
                    {...register("studentId")}
                    fullWidth
                    label="Student ID"
                    variant="outlined"
                    margin="normal"
                    name="studentId"
                    defaultValue={user.studentId}
                />
                <p className='ml-10 text-red-500'>{errors.studentId?.message} </p>
                 <Grid container spacing={2} className="mt-4">
                    <Grid item xs={6}>
                        <Button
                                variant="contained"
                                color="error"
                                fullWidth
                                onClick={() => navigate("/class")}
                        >
                                Hủy bỏ
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleSubmit(onSubmit)}
                        >
                            Cập nhật
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Box>
    )
}

export const updateProfileAction : ActionFunction = async({request})=>{
    const formData = await request.formData();
    const data:UserProfileReq = Object.fromEntries(formData) as UserProfileReq;
    try{
        await UserService.updateProfile(data);
        toast.success("Update success")
        return null;
    }catch(e:any){
        toast.error(e.message);
        return null;
    }
}