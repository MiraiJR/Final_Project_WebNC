import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';

enum TagValue {
    Feed = 'feed',
    List = 'list',
    Grade = 'grade',
}

// Hàm kiểm tra xem chuỗi có trong enum hay không
function isStringInEnum(value: string): value is TagValue {
    return Object.values(TagValue).includes(value as TagValue);
  }

export default function ClassDetail() {
    let {pathname} = useLocation();
    const pathnameSplit = pathname.split('/');
    function initValue () : string{
        if(isStringInEnum(pathnameSplit[3])){
            return pathnameSplit[3];
        }else{
            return ("");
        }
    }


    let {classID} = useParams();
    let link = `/class/${classID}`
    const [value, setValue] = useState<TagValue|string>(initValue());
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
            <Box>
                <Outlet></Outlet>
            </Box>
        </Box>
    )

}