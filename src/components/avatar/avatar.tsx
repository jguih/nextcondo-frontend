import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { Typography } from "../typography/typography";
import { getInitials } from "./get-initials";

export const Avatar: FC<ComponentProps<"div"> & { name: string }> = ({
  name,
  ...props
}) => {
  const classes = buildClassNames({}, styles.avatar, props.className);
  const initials = getInitials(name);

  return (
    <div {...props} className={classes}>
      <Typography>{initials}</Typography>
    </div>
  );
};
