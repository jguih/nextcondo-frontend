import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";

export const Select: FC<ComponentProps<"select">> = (props) => {
  const classes = buildClassNames({}, styles.select, props.className);
  return <select {...props} className={classes} />;
};
