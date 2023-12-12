import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Navbar from './Navbar/Navbar';
import { DrawerHeader } from './StyledDrawerHeader';
import Sidebar from './Sidebar/Sidebar';
import { MiniDrawer } from './StyledMiniDrawer';
import { DRAWERWIDTH } from '@/shared/utils/constant';
import useCheckSmallScreen from '@/shared/hooks/useCheckSmallScreen';
import { Outlet, redirect, useLoaderData, useOutletContext } from 'react-router-dom';
import UserService from '@/shared/services/UserService';
import { CodeResponse } from '@/shared/utils/codeResponse';
import ClassService from '@/shared/services/ClassService';
import { ClassRespData } from '@/shared/types/Resp/ClassResp';

interface LoaderData{
  userData: UserRespData,
  classList: ClassRespData[],
}

type RootContextType = {
  userData: UserRespData,
  classList: ClassRespData[],
}

const drawerWidth = DRAWERWIDTH;
function Root() {
  const {userData,classList} =  useLoaderData() as LoaderData;
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
      <Navbar onToggleMenuClick={handleDrawerToggle} userData={userData}/>
 
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
        <Sidebar isExpand={true} expandToOpen={()=>setSidebarExpand(true)} classList={classList}></Sidebar>
      </Drawer>
      <MiniDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' }
        }}
        open={sidebarExpand}
      >
        <Sidebar isExpand={sidebarExpand} expandToOpen={()=>setSidebarExpand(true)} classList={classList}></Sidebar>
      </MiniDrawer>

      
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, p: 3,
          overflowY: "scroll",
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <DrawerHeader></DrawerHeader>
        <Outlet context={{userData,classList}}></Outlet>
      </Box>
    </Box>
  );
}

export default Root;

export async function loader():Promise<LoaderData|Response> {
  try{
    const userData = (await UserService.getMe()).data;
    const classList = (await ClassService.getClassList()).data;
    return {userData,classList};
  }catch(e: any){
    if(e.message == CodeResponse.UNAUTHORIZED){
      return redirect('/');
    }
    throw new Error(e);
  }
}

export function useUser(): UserRespData{
  return useOutletContext<RootContextType>().userData;
}

export function useClassList(): ClassRespData[]{
  return useOutletContext<RootContextType>().classList;
}