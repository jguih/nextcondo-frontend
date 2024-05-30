"use client";

import { IconButton, Stack } from "@mui/joy";
import { ColorSchemeToggle } from "../utils/color-scheme-toggle";
import { FC } from "react";
import { useSidebar } from "../sidebar/store";
import { MenuOutlined } from "@mui/icons-material";

export const Header = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
      <HeaderComponent.MenuButton />
      <Stack direction={"row"} gap={1}>
        <ColorSchemeToggle />
      </Stack>
    </Stack>
  );
};

interface HeaderComponent {
  MenuButton: FC;
}

const MenuButton: HeaderComponent["MenuButton"] = () => {
  const openSidebar = useSidebar((state) => state.openSidebar);
  return (
    <IconButton size="sm" aria-label="open sidebar" onClick={openSidebar}>
      <MenuOutlined />
    </IconButton>
  );
};

const HeaderComponent: HeaderComponent = { MenuButton };
