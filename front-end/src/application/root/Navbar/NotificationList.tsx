import Badge from "@mui/material/Badge";
import { Bell as BellIcon } from "lucide-react";
import Menu from "@mui/material/Menu";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import NotificationItem from "./NotificationItem";
import { SocketNotificationService } from "@/shared/services/SocketNotificationService";

interface NotificationListProps {
  notifications: NotificationResp[],
}

export default function NotificationList({notifications}:NotificationListProps) {
  const [notificationList,setNotificationList] = useState(notifications);

  useEffect(()=>{
    SocketNotificationService.connect();
    SocketNotificationService.joinRoom();
    SocketNotificationService.listenForNewNotification((newNotification) => {
      setNotificationList((prevNotifications) =>
        prevNotifications ? [newNotification,...prevNotifications] : [newNotification]
      );
    });
    return () => {
      SocketNotificationService.disconnect();
    };
  })

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const countUnreadNotifications = (notifications : NotificationResp[]) => {
    const unreadNotifications = notifications.filter((notification) => !notification.isRead);
    return unreadNotifications.length;
  };
  return (
    <>
    <IconButton onClick={handleClick} >
      {countUnreadNotifications(notificationList) > 0 ? (
      <Badge badgeContent={countUnreadNotifications(notificationList)} color="error">
        <BellIcon />
      </Badge>
      ) : (
        <BellIcon />
      )}
    </IconButton>

    <Menu

        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: '150px',
            maxHeight: '500px', 
            overflowY: 'auto',
            scrollbarWidth: 'thin', 
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
        {
          notificationList.map((notification)=>(
            <NotificationItem notification={notification} key={notification.id}></NotificationItem>
          ))
        }
    </Menu>
    </>
  );
}
