"use client";

import { FC } from "react";
import styles from "./styles.module.scss";
import { Typography } from "../../typography/typography";
import { Button } from "../../button/button";
import { buildClassNames } from "../../utils/build-class-names";
import { Close } from "../../icon/icons/close";
import { List } from "../../list/list";
import { ListItem, ListItemAnchor, ListItemButton } from "../../list/items";
import { SunHigh } from "../../icon/icons/sun-high";
import { useThemeToggler } from "@/src/theme/components/useThemeToggler";
import { MoonFilled } from "../../icon/icons/moon-filled";
import { Gear } from "../../icon/icons/gear";
import { useSidebar } from "./useSidebar";

export type AppSidebarProps = {
  title: string;
};

export const AppSidebar: FC<AppSidebarProps> = ({ title }) => {
  const id = "appsidebar";
  const { open, shouldMount, closeSidebar } = useSidebar({ id, delay: 250 });

  const sidebarClasses = buildClassNames(
    { [styles.in]: open === true, [styles.out]: open === false },
    styles.sidebar
  );

  const backdropClasses = buildClassNames(
    { [styles.in]: open === true, [styles.out]: open === false },
    styles.backdrop
  );

  if (!shouldMount) return;

  return (
    <div id={id} data-testid={id} className={sidebarClasses}>
      <div className={styles["sidebar-header"]}>
        <Typography tag="h4">{title}</Typography>
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
      <div
        className={backdropClasses}
        onClick={closeSidebar}
        data-testid="backdrop"
      />
    </div>
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
