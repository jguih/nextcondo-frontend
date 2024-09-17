"use client";
import styles from "../styles.module.scss";
import { FC } from "react";
import { Button, ButtonProps } from "../button";
import { useFormContext } from "../../form/context";
import { buildClassNames } from "../../utils/build-class-names";

export const SubmitButton: FC<ButtonProps> = ({
  fullWidth = true,
  ...props
}) => {
  const { isPending } = useFormContext();
  const classes = buildClassNames({}, styles.submit, props.className);
  return (
    <Button
      {...props}
      fullWidth={fullWidth}
      type="submit"
      loading={isPending}
      className={classes}
    />
  );
};
