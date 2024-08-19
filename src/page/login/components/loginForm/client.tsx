"use client";
import { handleSubmitWithValidation } from "@/src/shared/components/validation/submit-custom-validation";
import {
  InputValidationContainer,
  ValidationMessages,
} from "@/src/shared/components/validation/input-validation-container";
import { FC, useState } from "react";
import { FormGroup } from "@/src/shared/components/formGroup/form-group";
import { Label } from "@/src/shared/components/label/label";
import { Input } from "@/src/shared/components/input/input";
import styles from "./styles.module.scss";
import { SubmitButton } from "@/src/shared/components/button/submit/submit-button";
import { Typography } from "@/src/shared/components/typography/typography";
import { Link } from "@/src/shared/components/link/link";
import * as auth from "@/src/data/auth/client";
import { useRouter } from "next/navigation";
import { loginCredencialsSchema } from "@/src/data/schemas/auth";
import { useEnv } from "@/src/shared/env/context";

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
  const env = useEnv();

  const handleFormAction = async (formData: FormData) => {
    const jsonData = {
      email: formData.get("email")?.valueOf(),
      password: formData.get("password")?.valueOf(),
    };
    const result = await loginCredencialsSchema.safeParseAsync(jsonData);

    if (!result.success) {
      setState({ isError: true, errorMessage: text.error });
      return;
    }

    const { success } = await auth.loginAsync(
      env.NEXT_PUBLIC_NEXTCONDOAPI_URL,
      formData
    );
    if (success) {
      router.push("/");
    } else {
      setState({ isError: true, errorMessage: text.error });
    }
  };

  return (
    <form
      action={handleFormAction}
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
        {text.recoverPassword}
      </Link>
      {state.isError && (
        <Typography color="danger" className={styles.error}>
          {state.errorMessage}
        </Typography>
      )}
      <SubmitButton className={styles["submit-btn"]}>
        <Typography tag="p">{text.submit}</Typography>
      </SubmitButton>
    </form>
  );
};
