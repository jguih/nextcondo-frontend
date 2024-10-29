import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";

export const FieldSet: FC<
  ComponentProps<"fieldset"> & { required?: boolean; isError?: boolean }
> = ({ required, isError, ...props }) => {
  const classes = buildClassNames(
    { [styles.required]: required === true, [styles.error]: isError === true },
    styles.fieldset,
    props.className
  );
  return <fieldset {...props} className={classes} />;
};
