"use client";

import { FC, ReactNode } from "react";
import { Sidebar } from "../sidebar";
import { useAppSidebar } from "./store";

type AppSidebarProps = {
  children?: ReactNode | ReactNode[];
};

export const AppSidebar: FC<AppSidebarProps> = ({ children }) => {
  const isOpen = useAppSidebar((state) => state.isOpen);
  const shouldMount = useAppSidebar((state) => state.shouldMount);
  const close = useAppSidebar((state) => state.close);
  const unmount = useAppSidebar((state) => state.unmount);

  return (
    <Sidebar
      isOpen={isOpen}
      shouldMount={shouldMount}
      onClose={close}
      onUnMount={unmount}
      data-testid={"appsidebar"}
    >
      {children}
    </Sidebar>
  );
};
