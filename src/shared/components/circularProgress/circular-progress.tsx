import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { safeParseClasses } from "../utils/safe-parse-classes";

export type CircularProgressProps = {
  /** @default "sm" */
  size?: "sm" | "md" | "lg";
} & ComponentProps<"div">;

export const CircularProgress: FC<CircularProgressProps> = ({
  size = "sm",
  ...props
}) => {
  const classes = safeParseClasses([
    styles.spinner,
    styles[size],
    props.className,
  ]);
  return <div {...props} className={classes}></div>;
};
