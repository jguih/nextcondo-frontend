"use client";
import { FC } from "react";
import { Button } from "../button/button";

export const SidebarCloseButton: FC = () => {
  const handleClose = () => {
    if (!document) return;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <Button onClick={() => handleClose()} color="neutral" variant="light">
      X
    </Button>
  );
};
