

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {  Divider } from '@mui/material';
import { MAIN_COLOR } from '@/shared/utils/constant';
import { ClassRespData } from '@/shared/types/Resp/ClassResp';

interface ClassCardProps {
  classData : ClassRespData
}

export default function ClassCard( {classData}:ClassCardProps) {
  return (
    <Card sx={{ width: 300, height: 250,borderRadius: '16px'}} className='m-5' variant='outlined'>
      <CardContent sx={{height:75, backgroundColor: MAIN_COLOR, color: 'black'}} >
        <Typography variant="h5" component="div" noWrap>
            {classData.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }}  noWrap>
          {classData.creator.fullname}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" sx={{height:75}}>
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <Divider></Divider>
      <CardActions>
        <Button size="small">Go to Class</Button>
      </CardActions>
    </Card>
  );
}
