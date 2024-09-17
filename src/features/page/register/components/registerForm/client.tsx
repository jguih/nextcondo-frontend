"use client";
import { FC, ReactElement, useState } from "react";
import styles from "./styles.module.scss";
import { useForm, FormProvider } from "@/src/components/form/context";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { Label } from "@/src/components/label/label";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { useServices } from "@/src/services/components/provider";
import { ValidationMessages } from "@/src/components/validation/types";

interface FormProps {
  children: ReactElement[] | ReactElement;
  error: ReactElement[] | ReactElement;
  submit: ReactElement[] | ReactElement;
  success: ReactElement[] | ReactElement;
}

export const RegisterUserForm: FC<FormProps> = ({
  error,
  children,
  submit,
  success,
}) => {
  const { AuthService } = useServices();
  const form = useForm();
  const { handleSubmitAsync } = form;
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  if (isSuccess) {
    return success;
  }

  const handleOnSubmitAsync = handleSubmitAsync(async (data) => {
    const success = await AuthService.RegisterAsync(data);
    if (success) {
      setIsSuccess(true);
    } else {
      setIsError(true);
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleOnSubmitAsync} noValidate className={styles.form}>
        {children}
        {isError && error}
        {submit}
      </form>
    </FormProvider>
  );
};

type FullNameProps = {
  label: string;
  validationMessages: Required<Pick<ValidationMessages, "valueMissing">>;
};

export const RegisterFormFullName: FC<FullNameProps> = ({
  label,
  validationMessages,
}) => {
  return (
    <InputValidationContainer
      id="register-name"
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError} required>
          <Label htmlFor={id}>{label}</Label>
          <Input
            id={id}
            name="fullname"
            type="text"
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

type PhoneProps = {
  label: string;
  description: string;
};

export const RegisterFormPhone: FC<PhoneProps> = ({ label, description }) => {
  return (
    <InputValidationContainer
      id="register-phone"
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError}>
          <Label htmlFor={id}>{label}</Label>
          <Typography tag="small" muted id={`${id}-help`}>
            {description}
          </Typography>
          <Input
            id={id}
            name="phone"
            type="tel"
            aria-describedby={`${id}-help`}
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

type EmailProps = {
  label: string;
  description: string;
  validationMessages: Required<
    Pick<ValidationMessages, "valueMissing" | "typeMismatch">
  >;
};

export const RegisterFormEmail: FC<EmailProps> = ({
  label,
  description,
  validationMessages,
}) => {
  return (
    <InputValidationContainer
      id="register-email"
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError} required>
          <Label htmlFor={id}>{label}</Label>
          <Typography tag="small" muted id={`${id}-help`}>
            {description}
          </Typography>
          <Input
            id={id}
            name="email"
            type="email"
            aria-describedby={`${id}-help`}
            {...inputProps}
          />
          {isError && (
            <Typography tag="small" color="danger">
              {errorMessage}
            </Typography>
          )}
        </FormGroup>
      )}
    />
  );
};

type PasswordProps = {
  label: string;
  description: string;
  validationMessages: Required<
    Pick<ValidationMessages, "tooShort" | "tooLong" | "valueMissing">
  >;
};

export const RegisterFormPassword: FC<PasswordProps> = ({
  label,
  description,
  validationMessages,
}) => {
  return (
    <InputValidationContainer
      id="register-password"
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError} required>
          <Label htmlFor={id}>{label}</Label>
          <Typography tag="small" muted id={`${id}-help`}>
            {description}
          </Typography>
          <Input
            id={id}
            name="password"
            type="password"
            minLength={8}
            maxLength={30}
            aria-describedby={`${id}-help`}
            {...inputProps}
          />
          {isError && (
            <Typography tag="small" color="danger">
              {errorMessage}
            </Typography>
          )}
        </FormGroup>
      )}
    />
  );
};
