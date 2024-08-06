import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { CircularProgress } from "../circularProgress/circular-progress";
import { SemanticColors } from "../global.types";

export type ButtonProps = {
  color?: SemanticColors;
  variant?: "solid" | "light";
  loading?: boolean;
} & ComponentProps<"button">;

export const Button: FC<ButtonProps> = ({
  color = "primary",
  variant = "solid",
  loading,
  ...props
}) => {
  const classes = buildClassNames(
    {
      [styles[color]]: color !== undefined,
      [styles[variant]]: variant !== undefined,
    },
    props.className,
    styles.button
  );
  return (
    <button {...props} disabled={loading || props.disabled} className={classes}>
      {loading ? <CircularProgress /> : props.children}
    </button>
  );
};
