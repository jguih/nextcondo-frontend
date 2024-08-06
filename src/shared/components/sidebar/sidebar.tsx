import { FC } from "react";
import { Button } from "../button/button";
import { Menu } from "../icon/icons/menu";
import styles from "./styles.module.scss";
import { ThemeToggle } from "@/src/theme/components/theme-toggle";
import { SidebarCloseButton } from "./close-button";
import { Typography } from "../typography/typography";

export const Sidebar: FC = () => {
  return (
    <div className={styles["sidebar-container"]}>
      <Button color="neutral" variant="light">
        <Menu />
      </Button>
      <div className={styles.sidebar}>
        <div className={styles["sidebar-header"]}>
          <Typography>Sidebar</Typography>
          <SidebarCloseButton />
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
