"use client";
import { ComponentProps, FC } from "react";
import { buildClassNames } from "../utils/build-class-names";
import styles from "./styles.module.scss";

export type SidebarState = {
  /** Sidebar open state. Primarily used for animations. */
  isOpen: boolean;
  /**
   * Sidebar mounted state. When `false` it'll be removed from DOM.
   */
  shouldMount: boolean;
};

export type SidebarProps = SidebarState & {
  /** Called when sidebar requests to be closed. */
  onClose: () => void;
  /** Called when sidebar requests to be removed from the DOM. */
  onUnMount: () => void;
} & ComponentProps<"div">;

export const Sidebar: FC<SidebarProps> = ({
  onClose,
  isOpen,
  shouldMount,
  onUnMount,
  ...props
}) => {
  const sidebarClasses = buildClassNames(
    { [styles.in]: isOpen === true, [styles.out]: isOpen === false },
    styles.sidebar,
    props.className
  );

  const backdropClasses = buildClassNames(
    { [styles.in]: isOpen === true, [styles.out]: isOpen === false },
    styles.backdrop
  );

  if (!shouldMount) return;

  return (
    <div
      {...props}
      onAnimationEnd={(event) => {
        props.onAnimationEnd?.(event);
        onUnMount();
      }}
      className={sidebarClasses}
    >
      {props.children}
      <div className={backdropClasses} onClick={() => onClose()} />
    </div>
  );
};
