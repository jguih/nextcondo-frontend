import styles from "./styles.module.scss";
import { FC } from "react";
import { Link, LinkProps } from "../link/link";
import { buildClassNames } from "../utils/build-class-names";

type NavButtonProps = LinkProps & {
  selected?: boolean;
};

export const BottomNavigationLink: FC<NavButtonProps> = ({
  selected,
  ...props
}) => {
  const classes = buildClassNames(
    { [styles.selected]: selected },
    styles["nav-link"]
  );
  return (
    <Link
      {...props}
      variant="light"
      color={`${selected ? "accent" : "neutral"}`}
      className={classes}
    />
  );
};
