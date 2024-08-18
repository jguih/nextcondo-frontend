import { useEffect, useState } from "react";
import { SidebarProps } from "../sidebar";

export type UseSidebarProps = {
  id: string;
};

export type SidebarHandler = {
  register: Pick<
    SidebarProps,
    "id" | "open" | "onClose" | "shouldMount" | "onUnMount"
  >;
  closeSidebar: () => void;
};

/**
 * Register a button with `[data-sidebarid={id}]` to toggle `mounted` and `opened` sidebar states returned by this hook, where `{id}` is the sidebar's id.
 * @returns `SidebarHandler` @see {@link SidebarHandler}
 */
export const useSidebar = ({ id }: UseSidebarProps): SidebarHandler => {
  const [open, setOpen] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);

  const onClose: SidebarProps["onClose"] = () => {
    setOpen(false);
  };

  const onUnMount: SidebarProps["onUnMount"] = () => {
    if (!open) setShouldMount(false);
  };

  useEffect(() => {
    if (!document) return;

    const toggler = document.querySelector(`[data-sidebarid="${id}"]`);

    const handleOnClick: (event: MouseEvent) => void = () => {
      setOpen(true);
      setShouldMount(true);
    };
    if (toggler instanceof HTMLButtonElement) {
      toggler.onclick = handleOnClick;
    }

    return () => {
      if (toggler instanceof HTMLButtonElement)
        toggler.removeEventListener("click", handleOnClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    register: { id, open, onClose, shouldMount, onUnMount },
    closeSidebar: () => setOpen(false),
  };
};
