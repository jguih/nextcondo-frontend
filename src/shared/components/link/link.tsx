import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { buildClassNames } from "../utils/build-class-names";
import { Sizes } from "../global.types";

export type LinkProps = {
  size?: Sizes;
} & NextLinkProps &
  ComponentProps<"a">;

export const Link: FC<LinkProps> = ({ size = "md", ...props }) => {
  const classes = buildClassNames(
    {
      [styles[`font-size-${size}`]]: size !== undefined,
    },
    styles.link,
    props.className
  );
  return <NextLink {...props} className={classes} />;
};
