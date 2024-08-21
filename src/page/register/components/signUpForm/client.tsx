"use client";
import { FC, FormEventHandler, ReactElement } from "react";
import { checkFormValidityFromEvent } from "@/src/shared/components/validation/utils";
import {
  InputValidationContainer,
  ValidationMessages,
} from "@/src/shared/components/validation/input-validation-container";
import { FormGroup } from "@/src/shared/components/formGroup/form-group";
import { Label } from "@/src/shared/components/label/label";
import { Input } from "@/src/shared/components/input/input";
import { Typography } from "@/src/shared/components/typography/typography";
import styles from "./styles.module.scss";
import { useAuthService } from "@/src/data/auth/client";
import { FormProvider, useForm } from "@/src/shared/components/form/context";

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
  const { registerAsync } = useAuthService();
  const form = useForm();
  const { isSuccess, isError, dispatch } = form;

  if (isSuccess) {
    return success;
  }

  const handleSubmitAsync: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: "reset" });
    const isValid = checkFormValidityFromEvent(event);

    if (!isValid) return;

    const formData: FormData = new FormData(event.currentTarget);

    dispatch({ type: "pending", payload: true });
    const { success } = await registerAsync(formData);
    if (success) {
      dispatch({ type: "success", payload: true });
    } else {
      dispatch({ type: "error", payload: true });
    }
    dispatch({ type: "pending", payload: false });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmitAsync} noValidate className={styles.form}>
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
