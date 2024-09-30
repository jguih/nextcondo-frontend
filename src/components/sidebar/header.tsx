import { Typography } from "../typography/typography";
import styles from "./styles.module.scss";
import { FC, ReactElement, ReactNode } from "react";

type SidebarHeaderProps = {
  title: string | ReactElement | ReactElement[];
  children?: ReactNode | ReactNode[];
};

export const SidebarHeader: FC<SidebarHeaderProps> = ({ title, children }) => {
  return (
    <div className={styles["sidebar-header"]}>
      {typeof title === "string" ? (
        <Typography tag="h4">{title}</Typography>
      ) : (
        title
      )}
      {children}
    </div>
  );
};
