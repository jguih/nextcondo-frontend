import { ComponentProps, FC } from "react";
import { buildClassNames } from "../utils/build-class-names";
import styles from "./styles.module.scss";
import { SemanticColors } from "@/src/theme/types";

export const Chip: FC<ComponentProps<"div"> & { color?: SemanticColors }> = ({
  color = "secondary",
  ...props
}) => {
  const classes = buildClassNames(
    {},
    styles.chip,
    styles[color],
    props.className
  );
  return <div {...props} className={classes} />;
};
