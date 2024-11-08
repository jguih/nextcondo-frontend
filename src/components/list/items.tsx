import { ComponentProps, FC } from "react";
import { buildClassNames } from "../utils/build-class-names";
import styles from "./styles.module.scss";
import Link, { LinkProps } from "next/link";

export const ListItem: FC<ComponentProps<"li">> = (props) => {
  const classes = buildClassNames({}, styles.item, props.className);
  return <li {...props} className={classes} />;
};

export const ListItemAnchor: FC<ComponentProps<"a"> & LinkProps> = (props) => {
  const classes = buildClassNames({}, styles["item-anchor"], props.className);
  return <Link {...props} className={classes} />;
};

export const ListItemButton: FC<ComponentProps<"button">> = (props) => {
  const classes = buildClassNames({}, styles["item-button"], props.className);
  return <button {...props} className={classes} />;
};

export const ListItemDropdown: FC<ComponentProps<"ul">> = (props) => {
  const classes = buildClassNames({}, styles["item-dropdown"], props.className);
  return <ul {...props} className={classes} />;
};
