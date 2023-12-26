import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { AlignJustify } from "lucide-react";
import UserMenu from "./UserMenu";
import AddClassMenu from "./AddClassMenu";
import NotificationList from "./NotificationList";
import { MAIN_COLOR } from "@/shared/utils/constant";
import { Link } from "react-router-dom";


interface NavbarProps{
  onToggleMenuClick : Function,
  userData : UserRespData,
}

export default function Navbar({ onToggleMenuClick, userData }: NavbarProps) {
  const handleToggleMenuClick = () => {
    onToggleMenuClick();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: MAIN_COLOR,
        color: "black",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleToggleMenuClick}
        >
          <AlignJustify />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/class">Classroom</Link>
        </Typography>
        <div>
          <AddClassMenu />
        </div>
        <div>
          <NotificationList></NotificationList>
        </div>
        <div>
          <UserMenu fullname={userData.fullname} />
        </div>
      </Toolbar>
    </AppBar>
  );
}
