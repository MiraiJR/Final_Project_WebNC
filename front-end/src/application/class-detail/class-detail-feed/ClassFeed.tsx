import { MAIN_COLOR } from '@/shared/utils/constant';
import Box from '@mui/material/Box';

export default function ClassFeed(){
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
                    <p className='text-4xl'>WEB NÂNG CAO</p>
                    <p className='text-xl'>abc def ghz</p>
                </div>
            </Box>
            
        </Box>
    )
}