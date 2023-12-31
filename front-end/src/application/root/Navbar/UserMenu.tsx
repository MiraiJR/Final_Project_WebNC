import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import React from "react";
import { LogOut, Settings } from "lucide-react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Helper } from "@/shared/utils/heper";
import { useNavigate } from "react-router-dom";
import JwtStorage from "@/shared/storages/JwtStorage";
import AuthService from "@/shared/services/AuthService";
import { toast } from "react-toastify";
import UserService from "@/shared/services/UserService";
import { useAuth0 } from "@auth0/auth0-react";
import { useGlobalState } from "@/shared/storages/GlobalStorage";

interface UserMenuProps {
  fullname: string;
}

export default function UserMenu({ fullname }: UserMenuProps) {
  const {setIsLogin} = useGlobalState();
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const { setIsLogin } = useGlobalState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { logout } = useAuth0();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const { data } = await UserService.getMe();
      await AuthService.logout();
      JwtStorage.deleteToken();
      setIsLogin(false);

      if (data.isSocialLogin) {
        logout({
          logoutParams: { returnTo: window.location.origin },
        });
        return;
      }

      navigate("/auth/sign-in");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleProfile = () => {
    navigate("/profile/update");
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {Helper.getFullNameIcon(fullname)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: "150px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfile}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogOut fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
