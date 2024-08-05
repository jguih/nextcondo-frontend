import { ComponentProps, FC } from "react";
import { SemanticColors, SizeOptions } from "../global.types";
import { buildClassNames } from "../utils/build-class-names";
import styles from "./styles.module.scss";

export type IconBaseProps = {
  /** @default "sm" */
  size?: SizeOptions;
  /** @default "inherit" */
  color?: SemanticColors;
} & ComponentProps<"span">;

export const IconBase: FC<IconBaseProps> = ({
  size = "sm",
  color = "on-background",
  ...props
}) => {
  const classes = buildClassNames(
    {
      [styles[`icon-${size}`]]: size !== undefined,
      [`stroke-${color}`]: color !== undefined && color !== "inherit",
    },
    props.className,
    styles.icon
  );
  return <span className={classes} {...props} />;
};