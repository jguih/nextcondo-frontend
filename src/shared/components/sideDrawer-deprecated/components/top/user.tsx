"use client";
import { Avatar, Typography } from "@mui/joy";
import { User as UserType } from "@supabase/supabase-js";
import { FC, Fragment } from "react";

export const User: FC<{ user: UserType }> = ({ user }) => {
  return (
    <Fragment>
      <Avatar size="md" />
      <div>
        <Typography level="title-sm">{user.user_metadata.name}</Typography>
        <Typography level="body-xs">{user.email}</Typography>
      </div>
    </Fragment>
  );
};
