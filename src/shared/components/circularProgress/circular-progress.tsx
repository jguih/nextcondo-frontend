import { FC } from "react";
import styles from "./styles.module.scss";
import { safeParseClasses } from "../utils/safe-parse-classes";

export type CircularProgressProps = {
  /** @default "sm" */
  size?: "sm" | "md" | "lg";
};

export const CircularProgress: FC<CircularProgressProps> = ({
  size = "sm",
}) => {
  const classes = safeParseClasses([styles.spinner, styles[size]]);
  return <div className={classes}></div>;
};
