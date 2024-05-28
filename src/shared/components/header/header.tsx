"use client";

import { Avatar, Stack } from "@mui/joy";
import HeaderComponents from "./header.components";

export const Header = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
      <HeaderComponents.MenuButton />
      <Stack direction={"row"} gap={1}>
        <HeaderComponents.ColorSchemeToggle />
        <HeaderComponents.AvatarButton />
      </Stack>
    </Stack>
  );
};
