import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { buildClassNames } from "../utils/build-class-names";
import { Sizes } from "../global.types";

export type LinkProps = {
  size?: Sizes["small"] | Sizes["inherit"];
} & NextLinkProps &
  ComponentProps<"a">;

export const Link: FC<LinkProps> = ({ size, ...props }) => {
  const classes = buildClassNames(
    { [styles[`font-size-${size}`]]: size !== undefined },
    props.className
  );
  return <NextLink {...props} className={classes} />;
};
