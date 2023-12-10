import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { redirect, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClassService from '@/shared/services/ClassService';




export default function AcceptInvitingDialog(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token:string = searchParams.get("token") as string
    if(token==null){
        toast.error('Accept link not valid')
        navigate('/class');
    }
    const cancelHandle = ()=>{
        navigate('/class')
    }

    const swithAccountHandle = ()=>{
        //logout
        navigate('/auth/sign-in');
    }

    const joinHandle = async ()=>{
        try{
            const result = (await ClassService.acceptInviteEmail(token)).data;
            toast.success('Join Class success ful')
            navigate(`/class/${result.idCode}`)
        }catch(e:any){
            toast.error(e.message);
        }
        
    }

    return (
        <React.Fragment>
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Accept Inviting to Class"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
            "Click 'Join' to accept the class invitation. Please ensure that the email associated with your account matches the email address to which the invitation was sent."
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={cancelHandle}>Cancel</Button>
            <Button onClick={swithAccountHandle}>Switch Account</Button>
            <Button onClick={joinHandle} autoFocus>
                Join
            </Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}