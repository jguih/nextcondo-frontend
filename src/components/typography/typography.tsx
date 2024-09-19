import { ComponentProps, createElement } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { SemanticColors } from "@/src/theme/types";

export type TypographyTags =
  | "p"
  | "small"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "legend"
  | "span";

export type TypographyProps<Tag extends TypographyTags> = {
  tag?: Tag;
  color?: SemanticColors;
  muted?: boolean;
} & Omit<ComponentProps<Tag>, "color">;

export const Typography = <Tag extends TypographyTags>({
  tag,
  color,
  muted,
  ...props
}: TypographyProps<Tag>) => {
  const classes = buildClassNames(
    {
      [`color-${color}`]: color !== undefined,
      [styles["muted"]]: muted === true,
    },
    props.className
  );
  return createElement(
    tag ?? "p",
    {
      ...props,
      className: classes,
    },
    props.children
  );
};
