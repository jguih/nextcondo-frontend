import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { safeParseClasses } from "../utils/safe-parse-classes";
import { CircularProgress } from "../circularProgress/circular-progress";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
} & ComponentProps<"button">;

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  loading,
  ...props
}) => {
  const _classes = [props.className, styles.button, styles[variant]];
  const classes = safeParseClasses(_classes);
  return (
    <button {...props} disabled={loading} className={classes}>
      {loading ? <CircularProgress /> : props.children}
    </button>
  );
};
