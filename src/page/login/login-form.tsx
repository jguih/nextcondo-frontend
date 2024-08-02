"use client";
import { handleSubmit } from "@/src/shared/components/validation/submit-custom-validation";
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
import { HelperText } from "@/src/shared/components/helperText/helper-text";
import { useFormState } from "react-dom";

interface LoginFormProps {
  label: {
    email: string;
    password: string;
    submit: string;
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
    {}
  );

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      style={{ marginTop: "calc(var(--spacing) * 4)" }}
    >
      <InputValidationContainer
        id="login-email"
        validationMessages={validationMessages.email}
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup>
            <Label required htmlFor={id}>
              {label.email}
            </Label>
            <Input
              id={id}
              name="email"
              type="email"
              required
              error={isError}
              aria-describedby={isError ? `${id}-help` : undefined}
              {...inputProps}
            />
            {isError && (
              <HelperText id={`${id}-help`} error>
                {errorMessage}
              </HelperText>
            )}
          </FormGroup>
        )}
      />
      <InputValidationContainer
        id="login-password"
        validationMessages={validationMessages.password}
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup>
            <Label required htmlFor={id}>
              {label.password}
            </Label>
            <Input
              id={id}
              name="password"
              type="password"
              required
              error={isError}
              aria-describedby={isError ? `${id}-help` : undefined}
              {...inputProps}
            />
            {isError && (
              <HelperText id={`${id}-help`} error>
                {errorMessage}
              </HelperText>
            )}
          </FormGroup>
        )}
      />
      <button type="submit">{label.submit}</button>
    </form>
  );
};
