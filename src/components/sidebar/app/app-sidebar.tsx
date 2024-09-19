"use client";

import { FC, ReactElement, ReactNode } from "react";
import { Typography } from "../../typography/typography";
import { Button } from "../../button/button";
import { Close } from "../../icon/icons/close";
import { List } from "../../list/list";
import { ListItem, ListItemAnchor, ListItemButton } from "../../list/items";
import { SunHigh } from "../../icon/icons/sun-high";
import { useThemeToggler } from "@/src/theme/components/useThemeToggler";
import { MoonFilled } from "../../icon/icons/moon-filled";
import { Gear } from "../../icon/icons/gear";
import { Sidebar } from "../sidebar";
import { useRouter } from "next/navigation";
import { useServices } from "@/src/services/components/provider";
import { Logout } from "../../icon/icons/logout";
import { useAppSidebar } from "./use-app-sidebar";
import { SidebarHeader } from "../header";

type AppSidebarProps = {
  header: ReactElement | ReactElement[];
  children: ReactNode | ReactNode[];
};

export const AppSidebar: FC<AppSidebarProps> = ({ header, children }) => {
  const isOpen = useAppSidebar((state) => state.isOpen);
  const shouldMount = useAppSidebar((state) => state.shouldMount);
  const close = useAppSidebar((state) => state.close);
  const unmount = useAppSidebar((state) => state.unmount);

  return (
    <Sidebar
      isOpen={isOpen}
      shouldMount={shouldMount}
      onClose={close}
      onUnMount={unmount}
      data-testid={"appsidebar"}
    >
      {header}
      <List>{children}</List>
    </Sidebar>
  );
};

export const AppSidebarHeader: FC = () => {
  const close = useAppSidebar((state) => state.close);
  return (
    <SidebarHeader title={"NextCondo"}>
      <Button
        onClick={close}
        color="neutral"
        variant="light"
        aria-label="close sidebar"
      >
        <Close size="lg" />
      </Button>
    </SidebarHeader>
  );
};

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

export const AppSidebarItemLogoutButton: FC<{ label: string }> = ({
  label,
}) => {
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
