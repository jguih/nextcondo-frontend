import { ComponentProps, createElement } from "react";
import { SemanticColors } from "../global.types";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";

type TypographyTags = "p" | "small" | "h1" | "h2" | "h3" | "h4";

export type TypographyProps<Tag extends TypographyTags> = {
  tag?: Tag;
  color?: SemanticColors;
} & Omit<ComponentProps<Tag>, "color">;

export const Typography = <Tag extends TypographyTags>({
  tag,
  color = "text",
  ...props
}: TypographyProps<Tag>) => {
  const classes = buildClassNames(
    { [styles[color]]: color !== undefined },
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
