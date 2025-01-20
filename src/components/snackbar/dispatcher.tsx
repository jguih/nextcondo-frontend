"use client";
import styles from "./styles.module.scss";
import { ComponentProps, FC } from "react";
import { useAppSnackbar } from "./store";
import { buildClassNames } from "../utils/build-class-names";
import { usePathname } from "next/navigation";
import { pathPosition } from "./path-position";
import { useLocale } from "@/src/features/localization/components/lang-provider";

export const AppSnackbarDispatcher: FC<
  ComponentProps<"div"> & { position?: "top" | "bottom" }
> = ({ position = "bottom", ...props }) => {
  const message = useAppSnackbar((state) => state.message);
  const isOpen = useAppSnackbar((state) => state.isOpen);
  const shouldMount = useAppSnackbar((state) => state.shouldMount);
  const unmount = useAppSnackbar((state) => state.unmount);
  const _pathName = usePathname();
  const lang = useLocale();
  const pathName = _pathName.replace(lang, "").substring(1);

  const getPosition = (): "top" | "bottom" => {
    let pos = position;
    pathPosition.forEach(({ path, position }) => {
      if (pathName.match(path)) {
        pos = position;
      }
    });
    return pos;
  };

  const messageClasses = buildClassNames(
    {
      [styles.in]: isOpen,
      [styles.out]: !isOpen,
    },
    styles.message,
    styles[`${message.level}`],
    styles[`position-${getPosition()}`],
    props.className
  );

  if (!shouldMount) return;

  return (
    <div
      {...props}
      key={message.text}
      className={messageClasses}
      onAnimationEnd={() => {
        unmount();
      }}
    >
      {message.text}
    </div>
  );
};
