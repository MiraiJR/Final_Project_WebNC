import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";

interface CreateClassFormDialogProps{
    open: boolean,
    onClose : ()=>void,
}

interface Inputs{
    code: string,
}

export default function JoinClassFormDialog({open,onClose}:CreateClassFormDialogProps){
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        criteriaMode: "firstError",
    })

    const onSubmit = (data:Inputs) => {
        console.log(data);  // { name: ... }

        
    }


    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create new class</DialogTitle>
            <DialogContent sx={{minWidth: '500px', marginLeft: '20px'}}>
                <TextField
                    {...register("code",{
                        required: 'This Field is required',
                    })}
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Class Code (Required)"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <p className='ml-10 text-red-500'>{errors.code?.message} </p>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}