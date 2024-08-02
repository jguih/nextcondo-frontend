import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { safeParseClasses } from "../utils/safe-parse-classes";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
} & ComponentProps<"button">;

export const Button: FC<ButtonProps> = ({ variant = "primary", ...props }) => {
  const _classes = [props.className, styles.button, styles[variant]];
  const classes = safeParseClasses(_classes);
  return <button {...props} className={classes} />;
};
