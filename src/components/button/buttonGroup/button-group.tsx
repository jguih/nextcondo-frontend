import { ComponentProps, FC } from "react";
import styles from "../styles.module.scss";
import { buildClassNames } from "../../utils/build-class-names";

export const ButtonGroup: FC<ComponentProps<"div">> = (props) => {
  const classes = buildClassNames({}, props.className, styles["button-group"]);
  return <div {...props} className={classes} />;
};
