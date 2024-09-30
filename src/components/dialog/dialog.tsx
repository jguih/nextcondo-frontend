import styles from "./styles.module.scss";
import { ComponentProps, forwardRef } from "react";
import { buildClassNames } from "../utils/build-class-names";

export const Dialog = forwardRef<HTMLDialogElement, ComponentProps<"dialog">>(
  function Dialog(props, forwardedRef) {
    const classes = buildClassNames({}, styles.dialog, props.className);
    return <dialog {...props} ref={forwardedRef} className={classes} />;
  }
);
