import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { buildClassNames } from "../utils/build-class-names";
import { SemanticColors, SizeOptions, ThemeVariant } from "@/src/theme/types";

export type LinkProps = {
  /** @default "accent" */
  color?: SemanticColors;
  /** @default "link" */
  variant?: ThemeVariant;
  size?: SizeOptions;
  orientation?: "vertical" | "horizontal";
} & NextLinkProps &
  ComponentProps<"a">;

export const Link: FC<LinkProps> = ({
  size = "md",
  color = "accent",
  variant = "light",
  orientation,
  ...props
}) => {
  const classes = buildClassNames(
    {
      [styles[color]]: color !== undefined,
      [styles[variant]]: variant !== undefined,
      [styles[`font-size-${size}`]]: size !== undefined,
      [styles[`orientation-${orientation}`]]: orientation !== undefined,
    },
    props.className
  );
  return <NextLink {...props} className={classes} />;
};
