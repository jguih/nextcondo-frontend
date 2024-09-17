import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import { Menu } from "../icon/icons/menu";

export type HeaderProps = {
  title?: string | ReactNode;
};

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Button variant="light" color="neutral" data-sidebarid="appsidebar">
          <Menu bold />
        </Button>
        {typeof title === "string" ? <Typography>{title}</Typography> : title}
      </div>
    </div>
  );
};
