import * as React from 'react';

import IconButton from '@mui/material/IconButton';


import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Plus } from 'lucide-react';




export default function AddClassMenu(){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
            <MenuItem onClick={handleClose}>Attend Class</MenuItem>
            <MenuItem onClick={handleClose}>Create New CLass</MenuItem>
        </Menu>
        </>
    )
}