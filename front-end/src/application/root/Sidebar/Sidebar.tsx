import List from '@mui/material/List';

import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DrawerHeader } from '../StyledDrawerHeader';
import {ChevronDown, ChevronUp, Inbox as InboxIcon,Mails as MailIcon} from  'lucide-react';
import { useState,useEffect } from 'react';
import { Collapse } from '@mui/material';

interface SidebarProps {
  isExpand : boolean;
  expandToOpen : ()=>void;
}

export default function({isExpand,expandToOpen}: SidebarProps){
    const [teacherOpen,SetTeacherOpen] = useState(false);

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


    return (
        <>
        <DrawerHeader>
          
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: isExpand ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: isExpand ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
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
              <InboxIcon /> 
            </ListItemIcon>
            <ListItemText primary="Educate" sx={{ opacity: isExpand ? 1 : 0 }} />
            {teacherOpen ? <ChevronUp /> : <ChevronDown />}
          </ListItemButton>
          <Collapse in={teacherOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>    
        </>
    )
}