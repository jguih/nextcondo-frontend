"use client";

import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import HomeIcon from "@mui/icons-material/Home";
import {
  Dashboard,
  KeyboardArrowDown,
  LogoutRounded,
  Message,
  Person,
} from "@mui/icons-material";
import { Fragment } from "react";
import SidebarComponents from "./sidebar.components";

export const SidebarContent = () => {
  return (
    <Fragment>
      <Stack direction={"row"} gap={1}>
        <Avatar size="md" />
        <div>
          <Typography level="title-sm">Username</Typography>
          <Typography level="body-xs">user@email.com</Typography>
        </div>
        <IconButton sx={{ marginLeft: "auto" }} size="sm">
          <LogoutRounded />
        </IconButton>
      </Stack>
      <Divider
        orientation="horizontal"
        sx={{ marginTop: 2, marginBottom: 2 }}
      />
      <List size="sm">
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <Dashboard />
            </ListItemDecorator>
            <ListItemContent>
              <Typography level="title-sm">Dashboard</Typography>
            </ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem nested>
          <SidebarComponents.CommonAreas />
        </ListItem>
        <ListItem nested>
          <SidebarComponents.Occurences />
        </ListItem>
        <ListItem nested>
          <SidebarComponents.Users />
        </ListItem>
      </List>
    </Fragment>
  );
};
