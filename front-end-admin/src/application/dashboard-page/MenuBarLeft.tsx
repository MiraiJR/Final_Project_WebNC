import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BarItem {
  label: string;
  path: string;
}

const listBarItem: BarItem[] = [
  {
    label: "Users Management",
    path: "/user-management",
  },
];

const MenuBarLeft = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {listBarItem.map((barItem, _index) => (
        <ListItemButton onClick={() => navigate(barItem.path)} key={_index}>
          <ListItemIcon>
            <UsersRound />
          </ListItemIcon>
          <ListItemText primary="Users Management" />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};

export default MenuBarLeft;
