"use client";

import { FC } from "react";
import { Gear } from "../../icon/icons/gear";
import { ListItem, ListItemAnchor, ListItemButton } from "../../list/items";
import { Typography } from "../../typography/typography";
import { SunHigh } from "../../icon/icons/sun-high";
import { MoonFilled } from "../../icon/icons/moon-filled";
import { useThemeToggler } from "@/src/theme/components/useThemeToggler";
import { useServices } from "@/src/services/components/provider";
import { useRouter } from "next/navigation";
import { Logout } from "../../icon/icons/logout";

export const AppSidebarItemConfigurations: FC<{ label: string }> = ({
  label,
}) => {
  return (
    <ListItem>
      <ListItemAnchor href={"/"}>
        <Gear size="md" bold />
        {label}
      </ListItemAnchor>
    </ListItem>
  );
};

export const AppSidebarItemThemeToggler: FC<{ label: string }> = ({
  label,
}) => {
  const { toggleTheme, theme, mounted } = useThemeToggler();

  return (
    <ListItem>
      <ListItemButton onClick={toggleTheme} disabled={!mounted}>
        {theme === "light" ? <SunHigh bold /> : <MoonFilled bold />}
        <Typography>{label}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

export const AppSidebarItemLogout: FC<{ label: string }> = ({ label }) => {
  const { AuthService } = useServices();
  const router = useRouter();

  const handleLogout = async () => {
    await AuthService.LogoutAsync();
    router.push("/login");
  };

  return (
    <ListItem>
      <ListItemButton onClick={() => handleLogout()}>
        <Logout />
        <Typography tag="p">{label}</Typography>
      </ListItemButton>
    </ListItem>
  );
};
