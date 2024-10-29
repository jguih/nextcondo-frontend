import styles from "./styles.module.scss";
import { buildClassNames } from "../../utils/build-class-names";
import { FormGroupProps } from "../form-group";
import { FC } from "react";
import { FormGroupProvider } from "../context";

export const RadioGroup: FC<FormGroupProps> = ({
  required,
  disabled,
  error,
  ...props
}) => {
  const classes = buildClassNames({}, styles["radio-group"], props.className);
  return (
    <FormGroupProvider value={{ required, disabled, error }}>
      <div {...props} className={classes} />
    </FormGroupProvider>
  );
};
