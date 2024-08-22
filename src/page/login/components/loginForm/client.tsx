"use client";
import { checkFormValidityFromEvent } from "@/src/shared/components/validation/utils";
import {
  InputValidationContainer,
  ValidationMessages,
} from "@/src/shared/components/validation/input-validation-container";
import { FC, FormEventHandler, ReactElement } from "react";
import { FormGroup } from "@/src/shared/components/formGroup/form-group";
import { Label } from "@/src/shared/components/label/label";
import { Input } from "@/src/shared/components/input/input";
import styles from "./styles.module.scss";
import { Typography } from "@/src/shared/components/typography/typography";
import { useRouter } from "next/navigation";
import {
  FormProvider,
  useForm,
  useFormContext,
} from "@/src/shared/components/form/context";
import { useServices } from "@/src/services/provider";

interface LoginFormProps {
  children?: ReactElement | ReactElement[];
}

export const LoginForm: FC<LoginFormProps> = ({ children }) => {
  const form = useForm();
  const { dispatch } = form;
  const router = useRouter();
  const { AuthService } = useServices();

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: "reset" });
    const isValid = checkFormValidityFromEvent(event);

    if (!isValid) return;

    const formData: FormData = new FormData(event.currentTarget);

    dispatch({ type: "pending", payload: true });
    const success = await AuthService.LoginAsync(formData);
    if (success) {
      dispatch({ type: "success", payload: true });
      router.push("/");
    } else {
      dispatch({ type: "error", payload: true });
    }
    dispatch({ type: "pending", payload: false });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleOnSubmit} noValidate className={styles.form}>
        {children}
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
  const { isError } = useFormContext();

  if (isError) {
    return (
      <Typography color="danger" className={styles.error}>
        {message}
      </Typography>
    );
  }
};
