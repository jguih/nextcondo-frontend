"use client";

import {
  Avatar,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import { useSidebar } from "./store";
import { FC, Fragment } from "react";
import {
  LogoutRounded,
  Dashboard,
  KeyboardArrowDown,
  Message,
  Home,
  Person,
} from "@mui/icons-material";
import { Toggler } from "../utils/toggler";

type SideDrawerProps = Omit<DrawerProps, "open" | "onClose">;

export const SideDrawer: FC<SideDrawerProps> = (props) => {
  const open = useSidebar((state) => state.open);
  const closeSidebar = useSidebar((state) => state.closeSidebar);
  return <Drawer open={open} onClose={closeSidebar} {...props} />;
};

export const SideDrawerContent: FC = () => {
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
          <ContentSection.CommonAreas />
        </ListItem>
        <ListItem nested>
          <ContentSection.Occurences />
        </ListItem>
        <ListItem nested>
          <ContentSection.Users />
        </ListItem>
      </List>
    </Fragment>
  );
};

interface ContentSection {
  Occurences: FC;
  CommonAreas: FC;
  Users: FC;
}

const Occurences: ContentSection["Occurences"] = () => {
  return (
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemDecorator>
            <Message />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Ocorrências</Typography>
          </ListItemContent>
          <KeyboardArrowDown
            sx={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </ListItemButton>
      )}
    >
      <List>
        <ListItem>Avisos</ListItem>
        <ListItem>Emergências</ListItem>
      </List>
    </Toggler>
  );
};

const CommonAreas: ContentSection["CommonAreas"] = () => {
  return (
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemDecorator>
            <Home />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Áreas comuns</Typography>
          </ListItemContent>
          <KeyboardArrowDown />
        </ListItemButton>
      )}
    >
      <List>
        <ListItem>Lavanderia</ListItem>
        <ListItem>Academia</ListItem>
      </List>
    </Toggler>
  );
};

const Users: ContentSection["Users"] = () => {
  return (
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemDecorator>
            <Person />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Usuário</Typography>
          </ListItemContent>
          <KeyboardArrowDown />
        </ListItemButton>
      )}
    >
      <List>
        <ListItem>User 1</ListItem>
        <ListItem>User 2</ListItem>
      </List>
    </Toggler>
  );
};

const ContentSection: ContentSection = { Occurences, CommonAreas, Users };
