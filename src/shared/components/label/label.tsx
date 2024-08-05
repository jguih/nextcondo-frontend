"use client";
import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { useFormGroupContext } from "../formGroup/context";
import { SemanticColors } from "../global.types";

export type LabelProps = {
  required?: boolean;
  color?: SemanticColors;
} & Omit<ComponentProps<"label">, "color">;

export const Label: FC<LabelProps> = ({
  required,
  color = "inherit",
  ...props
}) => {
  const context = useFormGroupContext();
  const classes = buildClassNames(
    {
      [styles.required]:
        (context && context.required === true) || required === true,
      [`color-${color}`]: color !== undefined,
    },
    props.className,
    styles.label
  );

  return <label {...props} className={classes} />;
};
