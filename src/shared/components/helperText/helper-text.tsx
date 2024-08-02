import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { safeParseClasses } from "../utils/safe-parse-classes";

export type HelperTextProps = {
  error?: boolean;
} & ComponentProps<"small">;

export const HelperText: FC<HelperTextProps> = ({ error, ...props }) => {
  const classes = safeParseClasses([
    styles["helper-text"],
    error ? styles.error : "",
    props.className,
  ]);
  return <small {...props} className={classes} />;
};
