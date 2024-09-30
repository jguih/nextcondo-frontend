import styles from "./styles.module.scss";
import { ComponentProps, FC } from "react";
import { buildClassNames } from "../utils/build-class-names";

export const DialogHeader: FC<ComponentProps<"div">> = (props) => {
  const classes = buildClassNames({}, styles.header, props.className);
  return <div {...props} className={classes} />;
};
