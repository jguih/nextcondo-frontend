import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { safeParseClasses } from "../utils/safe-parse-classes";

export type FormGroupProps = { error?: boolean } & ComponentProps<"div">;

export const FormGroup: FC<FormGroupProps> = ({ error, ...props }) => {
  const classes = safeParseClasses([
    styles["form-control"],
    error ? styles.error : "",
    props.className,
  ]);

  return <div {...props} className={classes} />;
};
