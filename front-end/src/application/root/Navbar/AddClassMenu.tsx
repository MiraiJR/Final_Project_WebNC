import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Plus } from 'lucide-react';
import CreateClassFormDialog from './ClassFormDialog/CreateClassFormDialog';
import JoinClassFormDialog from './ClassFormDialog/JoinClassFormDialog';




export default function AddClassMenu(){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [createClassOpen,setCreateClassOpen] = React.useState<boolean>(false);
    const [joinClassOpen,setJoinClassOpen] = React.useState<boolean>(false);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () :void => {
        setAnchorEl(null);
    };

    const createClassClickHanlde = ():void=>{
        handleClose();
        setCreateClassOpen(true);
       
    }

    const joinClassClickHanlde = ():void=>{
        handleClose();
        setJoinClassOpen(true);
    }

    const handleAddClassClose = ():void=>{
        setCreateClassOpen(false); 
    }   
    const handleJoinClassClose = ():void=>{
        setJoinClassOpen(false); 
    }  

    return(
        <>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            >
            <Plus />
        </IconButton>
        <Menu
            sx={{ mt: '30px' }}
            id="AddClass-menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={joinClassClickHanlde}>Attend Class</MenuItem>
            <JoinClassFormDialog open={joinClassOpen} onClose={handleJoinClassClose}></JoinClassFormDialog>
            <MenuItem onClick={createClassClickHanlde}>Create New CLass</MenuItem>
            <CreateClassFormDialog open={createClassOpen} onClose={handleAddClassClose}/>
        </Menu>
        </>
    )
}