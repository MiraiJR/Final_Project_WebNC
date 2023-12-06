import { MAIN_COLOR } from '@/shared/utils/constant';
import Box from '@mui/material/Box';
import { useClassDetail } from '../ClassDetail';

export default function ClassFeed(){
    const classDetail  = useClassDetail();
    return(
        <Box width="100%" maxWidth='1000px'>
            <Box 
            width="100%"
            height="150px"
            borderRadius= '10px'
            padding='10px'
            className='relative'
            bgcolor={MAIN_COLOR}>
                <div className="absolute bottom-4 left-4">
                    <p className='text-base font-bold uppercase'>{classDetail.title}</p>
                </div>
            </Box>
            
        </Box>
    )
}