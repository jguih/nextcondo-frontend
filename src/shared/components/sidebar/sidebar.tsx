"use client";

import { Drawer, DrawerProps } from "@mui/joy";
import { useSidebar } from "./store";

export const Sidebar = (props: Omit<DrawerProps, "open" | "onClose">) => {
  const open = useSidebar((state) => state.open);
  const closeSidebar = useSidebar((state) => state.closeSidebar);
  return <Drawer open={open} onClose={closeSidebar} {...props} />;
};
