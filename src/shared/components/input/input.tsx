import { ComponentProps, forwardRef } from "react";
import styles from "./styles.module.scss";

export type InputProps = {
  error?: boolean;
} & ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function a(
  { error, ...props },
  forwardedRef
) {
  const classes = [
    styles.input,
    `${(error && styles.error) ?? ""}`,
    `${props.className ?? ""}`,
  ];
  return <input {...props} className={classes.join(" ")} ref={forwardedRef} />;
});
