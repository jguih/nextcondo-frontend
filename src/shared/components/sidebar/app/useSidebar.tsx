import { useEffect, useState } from "react";
import { useDelayUnmount } from "./useDelayUnmount";

export type UseSidebarProps = {
  id: string;
  delay: number;
};

export type SidebarHandler = {
  /**
   * Sidebar open state. Don't use this to control wether the component should render or not, use `shouldMount` instead. This state is usefull for css classes and animations.
   */
  open: boolean;
  /**
   * Use this state to decide if the component should be rendered or not. It'll be updated after `open` updates after `delay`, this gives enough time to play animations.
   */
  shouldMount: boolean;
  /**
   * Helper functions that closes the sidebar.
   */
  closeSidebar: () => void;
};

/**
 * Register a button with `[data-sidebarid={id}]` to toggle `mounted` and `opened` sidebar states returned by this hook, where `{id}` is the sidebar's id.
 * @returns `SidebarHandler` @see {@link SidebarHandler}
 */
export const useSidebar = ({ id, delay }: UseSidebarProps): SidebarHandler => {
  const [open, setOpen] = useState(false);
  const { shouldMount } = useDelayUnmount({ open, delay });
  const closeSidebar = () => setOpen(false);

  useEffect(() => {
    if (!document) return;

    const toggler = document.querySelector(`[data-sidebarid="${id}"]`);
    const handleOnClick: (event: MouseEvent) => void = () => {
      setOpen(true);
    };
    if (toggler instanceof HTMLButtonElement) {
      toggler.onclick = handleOnClick;
    }

    return () => {
      if (toggler instanceof HTMLButtonElement)
        toggler?.removeEventListener("click", handleOnClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { open, closeSidebar, shouldMount };
};
