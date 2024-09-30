"use client";
import { FC, MouseEventHandler } from "react";
import { Button, ButtonProps } from "../button/button";
import { useAppSidebar } from "../sidebar/app/store";
import { Menu } from "../icon/icons/menu";

export const OpenAppSidebarButton: FC<ButtonProps> = (props) => {
  const open = useAppSidebar((state) => state.open);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    props.onClick?.(e);
    open();
  };

  return (
    <Button variant="light" color="neutral" {...props} onClick={handleOnClick}>
      <Menu bold />
      {props.children}
    </Button>
  );
};
