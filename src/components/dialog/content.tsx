import styles from "./styles.module.scss";
import { ComponentProps, FC } from "react";
import { buildClassNames } from "../utils/build-class-names";

export const DialogContent: FC<ComponentProps<"div">> = (props) => {
  const classes = buildClassNames({}, styles.content, props.className);
  return <div {...props} className={classes} />;
};
