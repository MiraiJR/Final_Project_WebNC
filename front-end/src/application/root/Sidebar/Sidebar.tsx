import List from '@mui/material/List';

import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DrawerHeader } from '../StyledDrawerHeader';
import {ChevronDown, ChevronUp, Home as HomeIcon, BookOpen as TeacherIcon, GraduationCap as StudentIcon } from  'lucide-react';
import { useState,useEffect } from 'react';
import { Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import { ClassRespData } from '@/shared/types/Resp/ClassResp';
import { UserRole } from '@/shared/types/UserRole';

interface SidebarProps {
  isExpand : boolean;
  expandToOpen : ()=>void;
  classList: ClassRespData[];
}

export default function({isExpand,expandToOpen,classList}: SidebarProps){
    const [teacherOpen,SetTeacherOpen] = useState(false);
    const [studentOpen,SetStudentOpen] = useState(false);

    useEffect(()=>{
      if(!isExpand){
        SetTeacherOpen(false);
      }
    },[isExpand])

    const handleTecherOpen = ()=>{
      SetTeacherOpen(!teacherOpen);
      if(!teacherOpen){
        expandToOpen();
      }
    }

    const handleStudentOpen = ()=>{
      SetStudentOpen(!studentOpen);
      if(!studentOpen){
        expandToOpen();
      }
    }

    const expandTeacherListItem = ()=>{
      const filterData = classList.filter( classroom => classroom.role != UserRole.HS)
      return filterData.map((classroom)=>(
        <ListItemButton sx={{ pl: 4 }} key={classroom.idCode}>
          <Link to = {`/class/${classroom.idCode}`}>
          <ListItemText primary={classroom.title} />
          </Link>
        </ListItemButton>
      ))
    }

    const expandStudentListItem = ()=>{
      const filterData = classList.filter( classroom => classroom.role == UserRole.HS)
      return filterData.map((classroom)=>(
        <ListItemButton sx={{ pl: 4 }} key={classroom.idCode}>
          <Link to = {`/class/${classroom.idCode}`}>
          <ListItemText primary={classroom.title} />
          </Link>
        </ListItemButton>
      ))
    }


    return (
        <>
        <DrawerHeader>
          
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key="Home" disablePadding sx={{ display: 'block' }}>
            <Link to='/class'>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isExpand ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isExpand ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: isExpand ? 1 : 0 }} />
              </ListItemButton>
              </Link>
            </ListItem>
        </List>
        
        
        <Divider />
        <List>
          <ListItemButton 
            sx={{
              minHeight: 48,
              justifyContent: isExpand ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={handleTecherOpen}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isExpand ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <TeacherIcon /> 
            </ListItemIcon>
            <ListItemText primary="Educate" sx={{ opacity: isExpand ? 1 : 0 }} />
            {teacherOpen ? <ChevronUp /> : <ChevronDown />}
          </ListItemButton>
          <Collapse in={teacherOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {expandTeacherListItem()}
              
            </List>
          </Collapse>
        </List>   

        <Divider />
        <List>
          <ListItemButton 
            sx={{
              minHeight: 48,
              justifyContent: isExpand ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={handleStudentOpen}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isExpand ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <StudentIcon /> 
            </ListItemIcon>
            <ListItemText primary="Study" sx={{ opacity: isExpand ? 1 : 0 }} />
            {studentOpen ? <ChevronUp /> : <ChevronDown />}
          </ListItemButton>
          <Collapse in={studentOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {expandStudentListItem()}
              
            </List>
          </Collapse>
        </List>    
        </>
    )
}