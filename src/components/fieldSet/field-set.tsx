import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";

export const FieldSet: FC<ComponentProps<"fieldset">> = (props) => {
  const classes = buildClassNames({}, styles.fieldset, props.className);
  return <fieldset {...props} className={classes} />;
};
