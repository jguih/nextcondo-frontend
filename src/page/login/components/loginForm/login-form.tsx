"use client";
import { handleSubmitWithValidation } from "@/src/shared/components/validation/submit-custom-validation";
import {
  InputValidationContainer,
  ValidationMessages,
} from "@/src/shared/components/validation/input-validation-container";
import { FC } from "react";
import { useLocale } from "@/src/localization/client/LangProvider";
import { FormState, login } from "./login.action";
import { FormGroup } from "@/src/shared/components/formGroup/form-group";
import { Label } from "@/src/shared/components/label/label";
import { Input } from "@/src/shared/components/input/input";
import { useFormState } from "react-dom";
import styles from "./styles.module.scss";
import { SubmitButton } from "@/src/shared/components/button/submit/submit-button";
import { Typography } from "@/src/shared/components/typography/typography";
import { Link } from "@/src/shared/components/link/link";

interface LoginFormProps {
  label: {
    email: string;
    password: string;
    submit: string;
    recoverPassword: string;
  };
  validationMessages: {
    email: Required<Pick<ValidationMessages, "valueMissing" | "typeMismatch">>;
    password: Required<Pick<ValidationMessages, "valueMissing">>;
  };
}

export const LoginForm: FC<LoginFormProps> = ({
  label,
  validationMessages,
}) => {
  const lang = useLocale();
  const [state, formAction] = useFormState<FormState, FormData>(
    (state, payload) => login.bind(null, state, payload, lang)(),
    { isError: false }
  );

  return (
    <form
      action={formAction}
      onSubmit={handleSubmitWithValidation}
      noValidate
      className={styles.form}
    >
      <InputValidationContainer
        id="login-email"
        validationMessages={validationMessages.email}
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup error={isError} required>
            <Label htmlFor={id}>{label.email}</Label>
            <Input
              id={id}
              name="email"
              type="email"
              aria-describedby={isError ? `${id}-help` : undefined}
              {...inputProps}
            />
            {isError && (
              <Typography tag="small" color="danger" id={`${id}-help`}>
                {errorMessage}
              </Typography>
            )}
          </FormGroup>
        )}
      />
      <InputValidationContainer
        id="login-password"
        validationMessages={validationMessages.password}
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup error={isError} required>
            <Label htmlFor={id}>{label.password}</Label>
            <Input
              id={id}
              name="password"
              type="password"
              aria-describedby={isError ? `${id}-help` : undefined}
              {...inputProps}
            />
            {isError && (
              <Typography tag="small" color="danger" id={`${id}-help`}>
                {errorMessage}
              </Typography>
            )}
          </FormGroup>
        )}
      />
      <Link href={"/login"} className={styles["forgot-password"]}>
        {label.recoverPassword}
      </Link>
      {state.isError && (
        <Typography color="danger" className={styles.error}>
          {state.errorMessage}
        </Typography>
      )}
      <SubmitButton className={styles["submit-btn"]}>
        <Typography tag="p" color="inherit">
          {label.submit}
        </Typography>
      </SubmitButton>
    </form>
  );
};
