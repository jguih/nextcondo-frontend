import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { buildClassNames } from "../utils/build-class-names";
import { SemanticColors, Sizes, ThemeVariant } from "@/src/theme/types";

export type LinkProps = {
  /** @default "accent" */
  color?: SemanticColors;
  /** @default "link" */
  variant?: ThemeVariant;
  size?: Sizes;
} & NextLinkProps &
  ComponentProps<"a">;

export const Link: FC<LinkProps> = ({
  size = "md",
  color = "accent",
  variant = "light",
  ...props
}) => {
  const classes = buildClassNames(
    {
      [styles[color]]: color !== undefined,
      [styles[variant]]: variant !== undefined,
      [styles[`font-size-${size}`]]: size !== undefined,
    },
    props.className
  );
  return <NextLink {...props} className={classes} />;
};
