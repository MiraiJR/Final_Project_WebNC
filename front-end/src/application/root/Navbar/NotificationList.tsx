
import * as React from 'react';
import Badge from '@mui/material/Badge';
import {Bell as BellIcon} from "lucide-react"

export default function NotificationList() {
  return (
    <Badge badgeContent={4} color="error">
      <BellIcon  />
    </Badge>
  );
}