import styles from "./styles.module.scss";
import { ComponentProps, forwardRef } from "react";
import { buildClassNames } from "../utils/build-class-names";
import { useFormGroupContext } from "../formGroup/context";

export const Radio = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  function Radio({ ...props }, forwardedRef) {
    const context = useFormGroupContext();
    const classes = buildClassNames({}, props.className, styles.radio);
    const isDisabled =
      props.disabled !== undefined
        ? props.disabled
        : context?.disabled ?? false;
    const isRequired =
      props.required !== undefined
        ? props.required
        : context?.required ?? false;

    return (
      <input
        {...props}
        disabled={isDisabled}
        required={isRequired}
        className={classes}
        type="radio"
        ref={forwardedRef}
      />
    );
  }
);
