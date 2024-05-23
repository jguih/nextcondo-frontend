"use client";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
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
import { Dispatch, Fragment, ReactNode, useState } from "react";

export const AppDrawer = () => {
  return (
    <Drawer open={true}>
      <Box role="presentation" sx={{ p: 2 }}>
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
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <HomeIcon />
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="title-sm">Áreas comuns</Typography>
              </ListItemContent>
              <KeyboardArrowDown />
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ListItemDecorator>
                    <Message />
                  </ListItemDecorator>
                  <ListItemContent>
                    <Typography level="title-sm">Avisos</Typography>
                  </ListItemContent>
                  <KeyboardArrowDown
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List>
                <ListItem>Hello</ListItem>
              </List>
            </Toggler>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Person />
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="title-sm">Usuário</Typography>
              </ListItemContent>
              <KeyboardArrowDown />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

type TogglerProps = {
  defaultExpanded?: boolean;
  children: ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
  }) => ReactNode;
};

const Toggler = ({
  defaultExpanded = false,
  renderToggle,
  children,
}: TogglerProps) => {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </Fragment>
  );
};
