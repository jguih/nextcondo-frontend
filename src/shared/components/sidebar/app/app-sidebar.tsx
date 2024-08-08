"use client";

import { FC, useEffect, useState } from "react";
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

export const AppSidebar: FC = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const unmount = () => setMounted(false);

  useEffect(() => {
    if (!document) return;

    const toggler = document.getElementById("appsidebar-toggler");
    const handleOnClick: (event: MouseEvent) => void = () => {
      setMounted(!mounted);
      if (!open) setOpen(true);
    };
    if (toggler instanceof HTMLButtonElement) {
      toggler.onclick = handleOnClick;
    }

    return () => toggler?.removeEventListener("click", handleOnClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sidebarClasses = buildClassNames(
    { [styles.in]: mounted === true, [styles.out]: mounted === false },
    styles.sidebar
  );

  const backdropClasses = buildClassNames(
    { [styles.in]: mounted === true, [styles.out]: mounted === false },
    styles.backdrop
  );

  if (!open) return;

  return (
    <div
      className={sidebarClasses}
      onAnimationEnd={() => {
        if (!mounted) setOpen(false);
      }}
    >
      <div className={styles["sidebar-header"]}>
        <Typography tag="h4">Galaxy Towers</Typography>
        <Button onClick={unmount} color="neutral" variant="light">
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
      <div className={backdropClasses} onClick={unmount} />
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
