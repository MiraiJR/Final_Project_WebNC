
import Box from '@mui/material/Box';
import ClassCard from './ClassCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

enum filter{
    Student = "Student",
    Teacher = "Teacher",
    All = "All",
}

export default function ClassList(){
    const [role, setRole] = useState<filter>(filter.All);

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value as filter);
    };
    return(
        <Box>
            <FormControl sx={{marginLeft: '20px'}}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={handleChangeRole}
                >
                    <MenuItem value={filter.Student}>{filter.Student}</MenuItem>
                    <MenuItem value={filter.Teacher}>{filter.Teacher}</MenuItem>
                    <MenuItem value={filter.All}>{filter.All}</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ 
                alignItems: 'flex-start', 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start' ,
                alignContent: 'flex-start',

                }}>
            
                
                <ClassCard></ClassCard>
                <ClassCard></ClassCard>
                <ClassCard></ClassCard>
                <ClassCard></ClassCard>
            </Box>
        </Box>
    )
}