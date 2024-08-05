"use client";
import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { useFormGroupContext } from "../formGroup/context";

export type LabelProps = {
  required?: boolean;
} & ComponentProps<"label">;

export const Label: FC<LabelProps> = ({ required, ...props }) => {
  const context = useFormGroupContext();
  const classes = buildClassNames(
    {
      [styles.required]:
        (context && context.required === true) || required === true,
    },
    props.className,
    styles.label
  );

  return <label {...props} className={classes} />;
};
