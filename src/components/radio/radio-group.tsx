import styles from "./styles.module.scss";
import { ComponentProps, FC } from "react";
import { buildClassNames } from "../utils/build-class-names";

export const RadioGroup: FC<ComponentProps<"div">> = (props) => {
  const classes = buildClassNames({}, props.className, styles["radio-group"]);
  return <div {...props} className={classes} />;
};
