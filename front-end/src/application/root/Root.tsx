import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar/Navbar';
import { DrawerHeader } from './StyledDrawerHeader';
import Sidebar from './Sidebar/Sidebar';
import { MiniDrawer } from './StyledMiniDrawer';
import { DRAWERWIDTH } from '@/shared/utils/constant';
import useCheckSmallScreen from '@/shared/hooks/useCheckSmallScreen';
import { Outlet } from 'react-router-dom';

const drawerWidth = DRAWERWIDTH;

export default function Root() {
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const [sidebarExpand, setSidebarExpand] = React.useState(false);
  const isSmallScreen = useCheckSmallScreen();

  const handleDrawerToggle = () => {
    if(isSmallScreen){
      setMobileOpen(!mobileOpen);
    }else{
      setSidebarExpand(!sidebarExpand)
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar onToggleMenuClick={handleDrawerToggle}/>
 
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Sidebar isExpand={true} expandToOpen={()=>setSidebarExpand(true)}></Sidebar>
      </Drawer>
      <MiniDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        open={sidebarExpand}
      >
        <Sidebar isExpand={sidebarExpand} expandToOpen={()=>setSidebarExpand(true)}></Sidebar>
      </MiniDrawer>

      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <DrawerHeader></DrawerHeader>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}