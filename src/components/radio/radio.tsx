import styles from "./styles.module.scss";
import { ComponentProps, forwardRef } from "react";
import { buildClassNames } from "../utils/build-class-names";

export const Radio = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  function Radio({ ...props }, forwardedRef) {
    const classes = buildClassNames({}, props.className, styles.radio);

    return (
      <input {...props} className={classes} type="radio" ref={forwardedRef} />
    );
  }
);
