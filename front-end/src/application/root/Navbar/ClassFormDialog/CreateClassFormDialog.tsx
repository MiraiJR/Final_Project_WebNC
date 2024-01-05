import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import { redirect, useSubmit } from 'react-router-dom';
import type { ActionFunction } from "react-router";
import ClassService from '@/shared/services/ClassService';
import { toast } from "react-toastify";
import { ClassDetailResp } from '@/shared/types/Resp/ClassResp';

interface CreateClassFormDialogProps{
    open: boolean,
    onClose : ()=>void,
}

interface Inputs{
    title: string,
    description: string,
}

export default function CreateClassFormDialog({open,onClose}:CreateClassFormDialogProps){
    const submit = useSubmit();
    const { register, handleSubmit, formState: { errors },reset } = useForm<Inputs>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        criteriaMode: "firstError",
    })

    const onSubmit =  (data:Inputs) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        submit(formData,{method : 'post', action: '/class'})
        reset(data)
        onClose();
    }

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create new class</DialogTitle>
            <DialogContent sx={{minWidth: '500px', marginLeft: '20px'}}>
                <TextField
                    {...register("title",{
                        required: 'This Field is required',
                    })}
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Create new class"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <p className='ml-10 text-red-500'>{errors.title?.message} </p>
            <DialogContent sx={{minWidth: '500px',marginLeft: '20px'}}>
                <TextField
                    {...register("description")}
                    margin="dense"
                    id="des"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
        </Dialog>
    )
    
}


export const createClassAction : ActionFunction= async({request}) => {
    const formData = await request.formData();
    const data:CreateClassReq = Object.fromEntries(formData) as CreateClassReq;
    try{
        const response : ClassDetailResp = (await ClassService.createClass(data)).data;
        return redirect(`/class/${response.idCode}`);
    }catch(e:any){
        toast.error(e.message);
        return;
    }
    
}
