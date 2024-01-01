import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Shapes, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const listBarItem: BarItem[] = [
  {
    label: "Users Management",
    path: "/user-management",
    icon: <UsersRound />,
  },
  {
    label: "Classes Management",
    path: "/class-management",
    icon: <Shapes />,
  },
];

const MenuBarLeft = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {listBarItem.map((barItem, _index) => (
        <ListItemButton onClick={() => navigate(barItem.path)} key={_index}>
          <ListItemIcon>{barItem.icon}</ListItemIcon>
          <ListItemText primary={barItem.label} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};

export default MenuBarLeft;
