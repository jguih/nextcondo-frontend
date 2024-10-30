import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { Typography } from "../typography/typography";
import { getInitials } from "./get-initials";
import { SizeOptions } from "@/src/theme/types";

export const Avatar: FC<
  ComponentProps<"div"> & { name: string; size?: SizeOptions }
> = ({ name, size = "md", ...props }) => {
  const classes = buildClassNames(
    {},
    styles.avatar,
    styles[`size-${size}`],
    props.className
  );
  const initials = getInitials(name);

  return (
    <div {...props} className={classes}>
      <Typography>{initials}</Typography>
    </div>
  );
};
