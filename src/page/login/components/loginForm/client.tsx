"use client";
import { checkFormValidityFromEvent } from "@/src/shared/components/validation/form";
import {
  InputValidationContainer,
  ValidationMessages,
} from "@/src/shared/components/validation/input-validation-container";
import { FC, FormEventHandler, useState } from "react";
import { FormGroup } from "@/src/shared/components/formGroup/form-group";
import { Label } from "@/src/shared/components/label/label";
import { Input } from "@/src/shared/components/input/input";
import styles from "./styles.module.scss";
import { Typography } from "@/src/shared/components/typography/typography";
import { Link } from "@/src/shared/components/link/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/components/button/button";
import { useAuthService } from "@/src/data/auth/client";

interface LoginFormProps {
  label: {
    email: string;
    password: string;
  };
  text: {
    error: string;
    submit: string;
    recoverPassword: string;
  };
  validationMessages: {
    email: Required<Pick<ValidationMessages, "valueMissing" | "typeMismatch">>;
    password: Required<Pick<ValidationMessages, "valueMissing">>;
  };
}

export type FormState =
  | {
      isError: true;
      errorMessage: string;
    }
  | {
      isError: false;
    };

export const LoginForm: FC<LoginFormProps> = ({
  label,
  text,
  validationMessages,
}) => {
  const [state, setState] = useState<FormState>({ isError: false });
  const router = useRouter();
  const { loginAsync } = useAuthService();
  const [isPending, setIsPending] = useState(false);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isValid = checkFormValidityFromEvent(event);

    if (!isValid) return;

    const formData: FormData = new FormData(event.currentTarget);

    setIsPending(true);
    const { success } = await loginAsync(formData);
    if (success) {
      router.push("/");
    } else {
      setState({ isError: true, errorMessage: text.error });
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleOnSubmit} noValidate className={styles.form}>
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
        {text.recoverPassword}
      </Link>
      {state.isError && (
        <Typography color="danger" className={styles.error}>
          {state.errorMessage}
        </Typography>
      )}
      <Button className={styles["submit-btn"]} loading={isPending}>
        <Typography tag="p">{text.submit}</Typography>
      </Button>
    </form>
  );
};
