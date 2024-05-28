import { create } from "zustand";

type SidebarState = {
  open: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  open: false,
  openSidebar: () => set({ open: true }),
  closeSidebar: () => set({ open: false }),
}));
