import { create } from "zustand";
import { SidebarState } from "../sidebar";

type AppSidebarStore = SidebarState & {
  unmount: () => void;
  open: () => void;
  close: () => void;
};

export const useAppSidebar = create<AppSidebarStore>((set, get) => ({
  isOpen: false,
  shouldMount: false,
  unmount: () => {
    const isOpen = get().isOpen;
    if (!isOpen) set({ shouldMount: false });
  },
  open: () => set({ isOpen: true, shouldMount: true }),
  close: () => set({ isOpen: false }),
}));
