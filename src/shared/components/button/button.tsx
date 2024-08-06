import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { CircularProgress } from "../circularProgress/circular-progress";
import { SemanticColors } from "../global.types";
import { Typography } from "../typography/typography";

export type ButtonProps = {
  color?: SemanticColors;
  variant?: "solid" | "light";
  loading?: boolean;
  fullWidth?: boolean;
} & ComponentProps<"button">;

export const Button: FC<ButtonProps> = ({
  color = "primary",
  variant = "solid",
  loading,
  fullWidth,
  children,
  ...props
}) => {
  const classes = buildClassNames(
    {
      [styles[color]]: color !== undefined,
      [styles[variant]]: variant !== undefined,
      [styles["full-width"]]: fullWidth === true,
    },
    props.className,
    styles.button
  );
  const content =
    typeof children === "string" ? (
      <Typography>{children}</Typography>
    ) : (
      children
    );
  return (
    <button {...props} disabled={loading || props.disabled} className={classes}>
      {loading ? <CircularProgress /> : content}
    </button>
  );
};
