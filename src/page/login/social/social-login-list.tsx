"use client";
import { ListItem, ListItemButton } from "@/src/shared/components/list/items";
import { List } from "@/src/shared/components/list/list";
import { FC } from "react";
// import { signInWithGoogle } from "./social-logins-list.actions";

export const SocialLoginList: FC = () => {
  return (
    <List>
      <ListItem>
        <ListItemButton>Google</ListItemButton>
      </ListItem>
    </List>
  );
};
