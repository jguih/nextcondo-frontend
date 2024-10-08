"use client";
import styles from "./styles.module.scss";
import { ComponentProps, FC } from "react";
import { useAppSnackbar } from "./store";
import { buildClassNames } from "../utils/build-class-names";

export const AppSnackbarDispatcher: FC<
  ComponentProps<"div"> & { position?: "top" | "bottom" }
> = ({ position = "bottom", ...props }) => {
  const message = useAppSnackbar((state) => state.message);
  const isOpen = useAppSnackbar((state) => state.isOpen);
  const shouldMount = useAppSnackbar((state) => state.shouldMount);
  const unmount = useAppSnackbar((state) => state.unmount);

  const messageClasses = buildClassNames(
    {
      [styles.in]: isOpen,
      [styles.out]: !isOpen,
      [styles["position-top"]]: position === "top",
      [styles["position-bottom"]]: position === "bottom",
    },
    styles.message,
    styles[`${message.level}`],
    props.className
  );

  if (!shouldMount) return;

  return (
    <div
      {...props}
      key={JSON.stringify(message)}
      className={messageClasses}
      onAnimationEnd={() => {
        unmount();
      }}
    >
      {message.text}
    </div>
  );
};
