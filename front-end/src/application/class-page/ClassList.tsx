
import Box from '@mui/material/Box';
import ClassCard from './ClassCard';


export default function ClassList(){
    return(
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
    )
}