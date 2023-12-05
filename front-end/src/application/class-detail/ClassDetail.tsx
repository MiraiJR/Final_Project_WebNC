import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

enum TagValue {
    Feed = 'feed',
    List = 'list',
    Grade = 'grade',
}

export default function ClassDetail() {
    let {classID} = useParams();
    console.log(classID)
    let link = `/class/${classID}`
    const [value, setValue] = useState<TagValue>(TagValue.Feed);
    const handleChange = (event: React.SyntheticEvent, newValue: TagValue) => {
        setValue(newValue);
    };
    
    return (
        <Box>
            <Tabs onChange={handleChange} value={value} >
                <Tab value={TagValue.Feed} label="Feed"  component={Link} to={link+`/${TagValue.Feed}`}/>
                <Tab value={TagValue.List} label="List" component={Link} to={link+`/${TagValue.List}`}/>
                <Tab value={TagValue.Grade} label="Grade"  component={Link} to={link+`/${TagValue.Grade}`}/>
            </Tabs>
        </Box>
    )

}