"use client";

import { FC } from "react";
import { Button } from "../../button/button";
import { Close } from "../../icon/icons/close";
import { SidebarHeader } from "../header";
import { useAppSidebar } from "./store";

export const AppSidebarHeader: FC<{ title?: string }> = ({
  title = "NextCondo",
}) => {
  const close = useAppSidebar((state) => state.close);
  return (
    <SidebarHeader title={title}>
      <Button
        onClick={close}
        color="neutral"
        variant="light"
        aria-label="close sidebar"
      >
        <Close size="lg" />
      </Button>
    </SidebarHeader>
  );
};
