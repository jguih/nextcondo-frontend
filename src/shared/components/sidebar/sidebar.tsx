"use client";
import { ComponentProps, FC } from "react";
import { buildClassNames } from "../utils/build-class-names";
import styles from "./styles.module.scss";

export type SidebarProps = {
  id: string;
  /** Called when sidebar requests to be closed. */
  onClose: () => void;
  /** Sidebar open state. Primarily used for animations. */
  open: boolean;
  /**
   * Sidebar mounted state. When `false` it'll be removed from DOM.
   */
  shouldMount: boolean;
  /** Called when sidebar requests to be removed from the DOM. */
  onUnMount: () => void;
} & ComponentProps<"div">;

export const Sidebar: FC<SidebarProps> = ({
  id,
  onClose,
  open,
  shouldMount,
  onUnMount,
  ...props
}) => {
  const sidebarClasses = buildClassNames(
    { [styles.in]: open === true, [styles.out]: open === false },
    styles.sidebar,
    props.className
  );

  const backdropClasses = buildClassNames(
    { [styles.in]: open === true, [styles.out]: open === false },
    styles.backdrop
  );

  if (!shouldMount) return;

  return (
    <div
      id={id}
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
