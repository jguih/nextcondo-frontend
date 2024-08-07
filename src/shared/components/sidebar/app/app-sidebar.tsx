"use client";

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ThemeToggle } from "@/src/theme/components/theme-toggle";
import { Typography } from "../../typography/typography";
import { Button } from "../../button/button";
import { buildClassNames } from "../../utils/build-class-names";
import { Close } from "../../icon/icons/close";
import { List } from "../../list/list";
import { ListItem } from "../../list/item/list-item";

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
        <Typography>Galaxy Towers</Typography>
        <Button onClick={unmount} color="neutral" variant="light">
          <Close />
        </Button>
      </div>
      <List>
        <ListItem>
          <ThemeToggle />
        </ListItem>
      </List>
      <div className={backdropClasses} onClick={unmount} />
    </div>
  );
};
