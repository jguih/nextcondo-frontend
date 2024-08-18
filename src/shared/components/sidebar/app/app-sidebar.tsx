"use client";

import { FC } from "react";
import styles from "../styles.module.scss";
import { Typography } from "../../typography/typography";
import { Button } from "../../button/button";
import { Close } from "../../icon/icons/close";
import { List } from "../../list/list";
import { ListItem, ListItemAnchor, ListItemButton } from "../../list/items";
import { SunHigh } from "../../icon/icons/sun-high";
import { useThemeToggler } from "@/src/theme/components/useThemeToggler";
import { MoonFilled } from "../../icon/icons/moon-filled";
import { Gear } from "../../icon/icons/gear";
import { useSidebar } from "../hooks/useSidebar";
import { Sidebar } from "../sidebar";

export const AppSidebar: FC = () => {
  const id = "appsidebar";
  const { register, closeSidebar } = useSidebar({
    id,
  });
  const { shouldMount } = register;

  if (!shouldMount) return;

  return (
    <Sidebar {...register} data-testid={id}>
      <div className={styles["sidebar-header"]}>
        <Typography tag="h4">NextCondo</Typography>
        <Button
          onClick={closeSidebar}
          color="neutral"
          variant="light"
          aria-label="close sidebar"
        >
          <Close size="lg" />
        </Button>
      </div>
      <List>
        <ListItem>
          <ListItemAnchor href={"/"}>
            <Gear size="md" bold />
            Configurações
          </ListItemAnchor>
        </ListItem>
        <ListItem>
          <ThemeToggler />
        </ListItem>
      </List>
    </Sidebar>
  );
};

const ThemeToggler: FC = () => {
  const { toggleTheme, theme, mounted } = useThemeToggler();
  return (
    <ListItemButton onClick={toggleTheme} disabled={!mounted}>
      {theme === "light" ? <SunHigh bold /> : <MoonFilled bold />}
      <Typography>Alternar Tema</Typography>
    </ListItemButton>
  );
};
