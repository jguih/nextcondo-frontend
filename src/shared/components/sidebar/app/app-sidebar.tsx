"use client";

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ThemeToggle } from "@/src/theme/components/theme-toggle";
import { Typography } from "../../typography/typography";
import { buildClassNames } from "../../utils/build-class-names";
import { Button } from "../../button/button";

export const AppSidebar: FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!document) return;

    const toggler = document.getElementById("appsidebar-toggler");
    if (toggler instanceof HTMLButtonElement) {
      toggler.onclick = (ev) => {
        setOpen(!open);
      };
    }
  }, []);

  const sidebarClasses = buildClassNames(
    { [styles.opened]: open === true },
    styles.sidebar
  );

  const backdropClasses = buildClassNames(
    {
      [styles.opened]: open === true,
    },
    styles.backdrop
  );

  return (
    <div className={sidebarClasses}>
      <div className={styles["sidebar-header"]}>
        <Typography>Sidebar</Typography>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </div>
      <ThemeToggle />
      <div className={backdropClasses} onClick={() => setOpen(false)} />
    </div>
  );
};
