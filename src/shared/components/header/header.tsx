"use client";

import { FC } from "react";
import styles from "./styles.module.scss";
import { Button } from "../button/button";
import { Menu } from "../icon/icons/menu";

export const Header = () => {
  return (
    <div className={styles.header}>
      <HeaderComponent.SideDrawerButton />
      <HeaderComponent.PropertyMenu />
    </div>
  );
};

interface HeaderComponent {
  SideDrawerButton: FC;
  PropertyMenu: FC;
}

const SideDrawerButton: HeaderComponent["SideDrawerButton"] = () => {
  return (
    <Button variant="light" aria-label="open sidedrawer">
      <Menu />
    </Button>
  );
};

const PropertyMenu: HeaderComponent["PropertyMenu"] = () => {
  return <></>;
};

const HeaderComponent: HeaderComponent = { SideDrawerButton, PropertyMenu };
