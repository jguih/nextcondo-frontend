import { create } from "zustand";

type Level = "info" | "success" | "error";

type SnackbarState = {
  message: {
    text: string;
    level: Level;
  };
  shouldMount: boolean;
  isOpen: boolean;
};

export type AppSnackbarStore = SnackbarState & {
  unmount: () => void;
  dispatch: (message: string, level: Level) => void;
};

const timeout = 5000;
let timer: ReturnType<typeof setTimeout> | null = null;

export const useAppSnackbar = create<AppSnackbarStore>((set, get) => ({
  message: { text: "", level: "info" },
  shouldMount: false,
  isOpen: false,
  unmount: () => {
    const isOpen = get().isOpen;
    if (!isOpen) set({ shouldMount: false });
  },
  dispatch: (message, level) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      set({ isOpen: false });
    }, timeout);
    timer = newTimer;
    set({
      message: { text: message, level: level },
      shouldMount: true,
      isOpen: true,
    });
  },
}));
