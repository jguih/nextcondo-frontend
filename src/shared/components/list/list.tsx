import { ComponentProps, createElement, ReactElement } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";

export type ListProps<Tag extends "ul" | "ol"> = {
  /** @default "ul" */
  tag?: Tag;
} & ComponentProps<Tag>;

export const List = <Tag extends "ul" | "ol">({
  tag,
  ...props
}: ListProps<Tag>): ReactElement => {
  const classes = buildClassNames({}, styles.list, props.className);
  return createElement(
    tag ?? "ul",
    { ...props, className: classes },
    props.children
  );
};
