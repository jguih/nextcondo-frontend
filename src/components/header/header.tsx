import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import { Typography } from "../typography/typography";
import { OpenAppSidebarButton } from "./open-app-sidebar-button";

export type HeaderProps = {
  title?: string | ReactNode | ReactNode[];
  actionButton?: ReactNode;
};

export const Header: FC<HeaderProps> = ({ title, actionButton }) => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {!actionButton ? <OpenAppSidebarButton /> : actionButton}
        {typeof title === "string" ? <Typography>{title}</Typography> : title}
      </div>
    </div>
  );
};
