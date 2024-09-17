import styles from "./styles.module.scss";
import { ComponentProps, forwardRef } from "react";
import { useFormGroupContext } from "../formGroup/context";
import { buildClassNames } from "../utils/build-class-names";

export type TextAreaProps = {
  error?: boolean;
} & ComponentProps<"textarea">;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ error, ...props }, forwardedRef) {
    const context = useFormGroupContext();
    const classes = buildClassNames(
      {
        [styles.error]:
          error === true || (context !== null && context.error === true),
      },
      styles.input,
      props.className
    );

    const required =
      props.required !== undefined ? props.required : context?.required;

    return (
      <textarea
        {...props}
        required={required}
        className={classes}
        ref={forwardedRef}
      />
    );
  }
);
