"use client";

import {
  Dropdown,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  MenuButton,
} from "@mui/joy";
import { FC } from "react";
import { KeyboardArrowDown, MenuOutlined } from "@mui/icons-material";
import { useSideDrawerContext } from "../sideDrawer/context";

export const Header = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
      <HeaderComponent.SideDrawerButton />
      <HeaderComponent.PropertyMenu />
    </Stack>
  );
};

interface HeaderComponent {
  SideDrawerButton: FC;
  PropertyMenu: FC;
}

const SideDrawerButton: HeaderComponent["SideDrawerButton"] = () => {
  const { setOpen } = useSideDrawerContext();
  const openSideDrawer = () => setOpen(true);
  return (
    <IconButton size="sm" aria-label="open sidebar" onClick={openSideDrawer}>
      <MenuOutlined />
    </IconButton>
  );
};

const PropertyMenu: HeaderComponent["PropertyMenu"] = () => {
  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        endDecorator={<KeyboardArrowDown />}
        size="md"
      >
        Ed. Downtown
      </MenuButton>
      <Menu variant="soft">
        <MenuItem>Perfil do condomínio</MenuItem>
      </Menu>
    </Dropdown>
  );
};

const HeaderComponent: HeaderComponent = { SideDrawerButton, PropertyMenu };
