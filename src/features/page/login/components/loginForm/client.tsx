"use client";

import { useForm, FormProvider } from "@/src/components/form/context";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { Label } from "@/src/components/label/label";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { useServices } from "@/src/services/components/provider";
import { useRouter } from "next/navigation";
import { ReactElement, FC, useState } from "react";
import styles from "./styles.module.scss";
import { ValidationMessages } from "@/src/components/validation/types";

interface LoginFormProps {
  children?: ReactElement | ReactElement[];
  error?: ReactElement | ReactElement[];
}

export const LoginForm: FC<LoginFormProps> = ({ children, error }) => {
  const form = useForm();
  const { handleSubmitAsync } = form;
  const router = useRouter();
  const { AuthService } = useServices();
  const [isError, setIsError] = useState(false);

  const handleOnSubmit = handleSubmitAsync(async (data) => {
    const success = await AuthService.LoginAsync(data);
    if (success) {
      router.push("/");
    } else {
      setIsError(true);
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleOnSubmit} noValidate className={styles.form}>
        {children}
        {isError && error}
      </form>
    </FormProvider>
  );
};

type EmailProps = {
  validationMessages: Required<
    Pick<ValidationMessages, "valueMissing" | "typeMismatch">
  >;
  label: string;
};

export const LoginFormEmail: FC<EmailProps> = ({
  validationMessages,
  label,
}) => {
  return (
    <InputValidationContainer
      id="login-email"
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError} required>
          <Label htmlFor={id}>{label}</Label>
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
  );
};

type PasswordProps = {
  validationMessages: Required<
    Required<Pick<ValidationMessages, "valueMissing">>
  >;
  label: string;
};

export const LoginFormPassword: FC<PasswordProps> = ({
  validationMessages,
  label,
}) => {
  return (
    <InputValidationContainer
      id="login-password"
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError} required>
          <Label htmlFor={id}>{label}</Label>
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
  );
};

export const LoginFormError: FC<{ message: string }> = ({ message }) => {
  return (
    <Typography color="danger" className={styles.error}>
      {message}
    </Typography>
  );
};
