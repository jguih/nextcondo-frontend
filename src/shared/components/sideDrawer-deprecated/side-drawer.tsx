"use client";

import {
  DialogContent,
  Divider,
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import { FC, Fragment } from "react";
import { Dashboard, Settings, Help } from "@mui/icons-material";
import { useSideDrawerContext } from "./context";
import { ContentSection } from "./components/content";
import { User as UserType } from "@supabase/supabase-js";
import { TopSection } from "./components/top";

type SideDrawerProps = Omit<DrawerProps, "open" | "onClose">;

export const SideDrawer: FC<SideDrawerProps> = (props) => {
  const { open, setOpen } = useSideDrawerContext();
  const closeSideDrawer = () => setOpen(false);
  return <Drawer open={open} onClose={closeSideDrawer} {...props} />;
};

export interface SideDrawerContentProps {
  label: Record<
    | "home"
    | "commonAreas"
    | "occurrences"
    | "tenants"
    | "user"
    | "configurations"
    | "help"
    | "changeTheme",
    string
  >;
  user: UserType;
}

export const SideDrawerContent: FC<SideDrawerContentProps> = ({
  user,
  label,
}) => {
  return (
    <Fragment>
      <Stack direction={"row"} gap={1}>
        <TopSection.User user={user} />
        <TopSection.SignOut />
      </Stack>
      <Divider
        orientation="horizontal"
        sx={{ marginTop: 2, marginBottom: 2 }}
      />
      <DialogContent>
        <List size="sm" sx={{ flexGrow: 0 }}>
          <ListItem>
            <ListItemButton selected>
              <ListItemDecorator>
                <Dashboard />
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="title-sm">{label.home}</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <ContentSection.CommonAreas label={label.commonAreas} />
          </ListItem>
          <ListItem nested>
            <ContentSection.Occurrences label={label.occurrences} />
          </ListItem>
          <ListItem nested>
            <ContentSection.Residents label={label.tenants} />
          </ListItem>
          <ListItem nested>
            <ContentSection.User label={label.user} />
          </ListItem>
        </List>
        <Divider />
        <List size="sm">
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Settings />
              </ListItemDecorator>
              <ListItemContent>{label.configurations}</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Help />
              </ListItemDecorator>
              <ListItemContent>{label.help}</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ContentSection.ThemeToggle label={label.changeTheme} />
          </ListItem>
        </List>
      </DialogContent>
    </Fragment>
  );
};
