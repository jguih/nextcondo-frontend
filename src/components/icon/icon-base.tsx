import { ComponentProps, FC } from "react";
import { buildClassNames } from "../utils/build-class-names";
import styles from "./styles.module.scss";
import { SemanticColors, SizeOptions } from "@/src/theme/types";

export type IconBaseProps = {
  /** @default "sm" */
  size?: SizeOptions;
  /** @default "inherit" */
  color?: SemanticColors;
  bold?: boolean;
} & ComponentProps<"span">;

export const IconBase: FC<IconBaseProps> = ({
  size = "md",
  color,
  bold,
  ...props
}) => {
  const classes = buildClassNames(
    {
      [styles[`icon-${size}`]]: size !== undefined,
      [`stroke-${color}`]: color !== undefined,
      [`color-${color}`]: color !== undefined,
      [styles.bold]: bold,
    },
    styles.icon,
    props.className
  );
  return <span className={classes} {...props} />;
};
