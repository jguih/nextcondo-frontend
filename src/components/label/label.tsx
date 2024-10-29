"use client";
import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { useFormGroupContext } from "../formGroup/context";
import { SemanticColors } from "@/src/theme/types";

export type LabelProps = {
  required?: boolean;
  disabled?: boolean;
  color?: SemanticColors;
} & Omit<ComponentProps<"label">, "color">;

export const Label: FC<LabelProps> = ({
  required,
  disabled,
  color,
  ...props
}) => {
  const context = useFormGroupContext();
  const isRequired =
    (required !== undefined ? required : context?.required) ?? false;
  const isDisabled =
    (disabled !== undefined ? disabled : context?.disabled) ?? false;
  const classes = buildClassNames(
    {
      [styles.required]: isRequired,
      [styles.disabled]: isDisabled,
      [`color-${color}`]: color !== undefined,
    },
    styles.label,
    props.className
  );

  return <label {...props} className={classes} />;
};
