"use client";
import { List, ListItem, ListItemButton } from "@mui/joy";
import { FC } from "react";
import { signInWithGoogle } from "./social-logins-list.actions";

export const SocialLoginList: FC = () => {
  return (
    <List>
      <ListItem>
        <ListItemButton>Google</ListItemButton>
      </ListItem>
    </List>
  );
};
