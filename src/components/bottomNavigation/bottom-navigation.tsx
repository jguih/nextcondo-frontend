import { buildClassNames } from "../utils/build-class-names";
import styles from "./styles.module.scss";
import { ComponentProps, FC } from "react";

export const BottomNavigation: FC<ComponentProps<"div">> = (props) => {
  const classes = buildClassNames(
    {},
    styles["bottom-navigation"],
    props.className
  );
  return <div {...props} className={classes} />;
};
