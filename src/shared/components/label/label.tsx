import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { safeParseClasses } from "../utils/safe-parse-classes";

export type LabelProps = {
  required?: boolean;
} & ComponentProps<"label">;

export const Label: FC<LabelProps> = ({ required, ...props }) => {
  const classes = safeParseClasses([
    required ? styles.required : "",
    props.className,
  ]);
  return <label {...props} className={classes} />;
};
