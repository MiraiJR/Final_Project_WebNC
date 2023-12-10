import { MAIN_COLOR } from '@/shared/utils/constant';
import Box from '@mui/material/Box';
import { useClassDetail } from '../ClassDetail';
import InviteCodeAndLinkBox from './InviteCodeAndLinkBox';

export default function ClassFeed(){
    const classDetail  = useClassDetail();
    return(
        <Box width="100%" maxWidth='1000px' className="space-y-4">
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

            <Box className="flex flex-col">
                <Box>
                    <InviteCodeAndLinkBox classId={classDetail.idCode}></InviteCodeAndLinkBox>
                </Box>
            </Box>
            
        </Box>
    )
}