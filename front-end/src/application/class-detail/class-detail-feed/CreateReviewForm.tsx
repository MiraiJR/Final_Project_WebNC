import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GradeAssignmentResp, GradeReviewResp } from '@/shared/types/Resp/ClassResp';
import { GradeReviewService } from '@/shared/services/GradeReviewService';
import { useClassDetail } from '../ClassDetail';

interface CreateReviewFormDialogProps{
    open: boolean,
    onClose : ()=>void,
    gradeAssignment : GradeAssignmentResp,
}

interface Inputs{
    expectedScore: number,
    explain: string,
}

export default function CreateReviewFormDialog({open,onClose,gradeAssignment}:CreateReviewFormDialogProps){
    const classDetail = useClassDetail();
    const { register, handleSubmit, formState: { errors },reset } = useForm<Inputs>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        criteriaMode: "firstError",
    })

    const onSubmit = async (data:Inputs) => {
        const reviewReq :GradeReviewReq = {
            structureId: gradeAssignment.id,
            expectPercentScore: data.expectedScore,
            explain: data.explain,
        }
        try{
            const reviewResp: GradeReviewResp = (await GradeReviewService.createGradeReviewService(classDetail.idCode,reviewReq)).data;
            reviewResp;
            toast.success("Create Review Success")
        }catch(error:any){
            toast.error(error.message)
        }

        reset({
            expectedScore:0,
            explain: '',
        });
        onClose();
    }

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Grade Review for Assignment {gradeAssignment.nameAssignment}</DialogTitle>
            <DialogContent sx={{minWidth: '500px', marginLeft: '20px'}}>
                <TextField
                    {...register("expectedScore",{
                        required: 'This Field is required',
                        min :{
                            value: 0,
                            message: 'Can not lower than 0',
                        },
                        max:{
                            value: 10,
                            message: 'Can not bigger than 10',
                        }
                    })}
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Expected Score"
                    type="number"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <p className='ml-10 text-red-500'>{errors.expectedScore?.message} </p>
            <DialogContent sx={{minWidth: '500px',marginLeft: '20px'}}>
                <TextField
                    {...register("explain",{
                        required : 'This Field is required'
                    })}
                    margin="dense"
                    id="des"
                    label="Explain"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <p className='ml-10 text-red-500'>{errors.explain?.message} </p>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
        </Dialog>
    )

    
}
