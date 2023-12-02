

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divide } from 'lucide-react';
import { Divider } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ClassCard() {
  return (
    <Card sx={{ width: 300, height: 250}} className='m-5'>
      <CardContent>
        <Typography variant="h5" component="div" noWrap>
          Web Nâng cao
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" noWrap>
          Nguyễn Huy Khánh
        </Typography>
        <Divider></Divider>
        <Typography variant="body2" sx={{height:100}}>
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
