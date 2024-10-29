"use client";
import { ComponentProps, forwardRef } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { useFormGroupContext } from "../formGroup/context";

export type InputProps = {
  error?: boolean;
  fullWidth?: boolean;
} & ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, fullWidth = false, ...props },
  forwardedRef
) {
  const context = useFormGroupContext();
  const classes = buildClassNames(
    {
      [styles.error]:
        error === true || (context !== null && context.error === true),
      [styles["full-width"]]: fullWidth === true,
    },
    styles.input,
    props.className
  );
  const isDisabled =
    props.disabled !== undefined ? props.disabled : context?.disabled ?? false;
  const isRequired =
    props.required !== undefined ? props.required : context?.required ?? false;

  return (
    <input
      {...props}
      required={isRequired}
      disabled={isDisabled}
      className={classes}
      ref={forwardedRef}
    />
  );
});
