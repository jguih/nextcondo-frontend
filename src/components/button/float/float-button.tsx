import { FC } from "react";
import { Button, ButtonProps } from "../button";
import { buildClassNames } from "../../utils/build-class-names";
import styles from "./styles.module.scss";

export const FloatButton: FC<ButtonProps> = (props) => {
  const classes = buildClassNames({}, styles.float, props.className);
  return <Button {...props} className={classes} round />;
};
