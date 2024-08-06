"use client";

import { FC } from "react";
import styles from "./styles.module.scss";
import { Button } from "../button/button";
import { Menu } from "../icon/icons/menu";
import { Typography } from "../typography/typography";
import { Sidebar } from "../sidebar/sidebar";

export type HeaderProps = {
  title?: string;
};

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Sidebar />
        {title && <Typography>{title}</Typography>}
      </div>
    </div>
  );
};
