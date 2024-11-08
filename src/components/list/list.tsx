import { ComponentProps, createElement, ReactElement } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { Sizes } from "@/src/theme/types";

export type ListProps<Tag extends "ul" | "ol"> = {
  /** @default "ul" */
  tag?: Tag;
  /** @default "md" */
  spacing?: Sizes["small"] | Sizes["medium"] | "none";
} & ComponentProps<Tag>;

export const List = <Tag extends "ul" | "ol">({
  tag,
  spacing = "md",
  ...props
}: ListProps<Tag>): ReactElement => {
  const classes = buildClassNames(
    {},
    styles.list,
    styles[`spacing-${spacing}`],
    props.className
  );
  return createElement(
    tag ?? "ul",
    { ...props, className: classes },
    props.children
  );
};
