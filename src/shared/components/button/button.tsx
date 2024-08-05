import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { CircularProgress } from "../circularProgress/circular-progress";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "transparent";
  loading?: boolean;
} & ComponentProps<"button">;

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  loading,
  ...props
}) => {
  const classes = buildClassNames(
    { [styles[variant]]: variant !== undefined },
    props.className,
    styles.button
  );
  return (
    <button {...props} disabled={loading} className={classes}>
      {loading ? <CircularProgress /> : props.children}
    </button>
  );
};
