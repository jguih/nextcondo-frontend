import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";
import { FormGroupContextState, FormGroupProvider } from "./context";

export type FormGroupProps = FormGroupContextState & ComponentProps<"div">;

export const FormGroup: FC<FormGroupProps> = ({
  error,
  required,
  ...props
}) => {
  const classes = buildClassNames(
    { [styles.error]: error === true },
    styles["form-group"],
    props.className
  );
  return (
    <FormGroupProvider value={{ error, required }}>
      <div {...props} className={classes} />
    </FormGroupProvider>
  );
};
