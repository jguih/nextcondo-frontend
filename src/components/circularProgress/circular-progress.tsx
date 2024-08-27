import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";

export type CircularProgressProps = {
  /** @default "sm" */
  size?: "sm" | "md" | "lg";
} & ComponentProps<"div">;

export const CircularProgress: FC<CircularProgressProps> = ({
  size = "md",
  ...props
}) => {
  const classes = buildClassNames(
    { [styles[size]]: size !== undefined },
    styles.spinner,
    props.className
  );
  return <div {...props} className={classes}></div>;
};
