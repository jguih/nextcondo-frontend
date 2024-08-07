"use client";

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ThemeToggle } from "@/src/theme/components/theme-toggle";
import { Typography } from "../../typography/typography";
import { Button } from "../../button/button";
import { buildClassNames } from "../../utils/build-class-names";

export const AppSidebar: FC = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const unmount = () => setMounted(false);

  useEffect(() => {
    if (!document) return;

    const toggler = document.getElementById("appsidebar-toggler");
    const handleOnClick = (event: MouseEvent) => {
      setMounted(!mounted);
      if (!open) setOpen(true);
    };
    if (toggler instanceof HTMLButtonElement) {
      toggler.onclick = handleOnClick;
    }

    return () => toggler?.removeEventListener("click", handleOnClick);
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
        <Typography>Sidebar</Typography>
        <Button onClick={unmount}>Close</Button>
      </div>
      <ThemeToggle />
      <div className={backdropClasses} onClick={unmount} />
    </div>
  );
};
