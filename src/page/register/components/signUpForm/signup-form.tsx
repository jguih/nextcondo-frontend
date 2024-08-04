"use client";
import { FC } from "react";
import { FormState, signUp } from "./signup.action";
import { useFormState } from "react-dom";
import { useLocale } from "@/src/localization/client/LangProvider";
import { ValidationMessages } from "@/src/shared/forms/input";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/src/shared/components/validation/submit-custom-validation";
import { InputValidationContainer } from "@/src/shared/components/validation/input-validation-container";
import { FormGroup } from "@/src/shared/components/formGroup/form-group";
import { Label } from "@/src/shared/components/label/label";
import { Input } from "@/src/shared/components/input/input";
import { SubmitButton } from "@/src/shared/components/button/submit/submit-button";
import { Typography } from "@/src/shared/components/typography/typography";
import { Button } from "@/src/shared/components/button/button";
import styles from "./styles.module.scss";

interface FormProps {
  label: {
    name: string;
    phone: string;
    email: string;
    password: string;
    submit: string;
  };
  description: {
    phone: string;
    email: string;
    password: string;
  };
  validationMessages: {
    name: Required<Pick<ValidationMessages, "valueMissing">>;
    email: Required<Pick<ValidationMessages, "valueMissing" | "typeMismatch">>;
    password: Required<
      Pick<ValidationMessages, "tooShort" | "tooLong" | "valueMissing">
    >;
  };
  goToLoginPageActionMessage: string;
}

export const SignUpForm: FC<FormProps> = ({
  label,
  validationMessages,
  description,
  goToLoginPageActionMessage,
}) => {
  const router = useRouter();
  const lang = useLocale();
  const [state, formAction] = useFormState<FormState, FormData>(
    (state, payload) => signUp.bind(null, state, payload, lang)(),
    { submited: false }
  );

  if (!state.error && state.submited) {
    return (
      <div className={styles["success-box"]}>
        <Typography tag="p" color="success">
          {/* {state.message} */}
          Success message
        </Typography>
        <Button
          onClick={() => {
            router.push("/login");
          }}
        >
          {goToLoginPageActionMessage}
        </Button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className={styles.form}
    >
      <InputValidationContainer
        id="register-name"
        validationMessages={validationMessages.name}
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup error={isError} required>
            <Label htmlFor={id}>{label.name}</Label>
            <Input
              id={id}
              name="name"
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
      <InputValidationContainer
        id="register-phone"
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup error={isError}>
            <Label htmlFor={id}>{label.phone}</Label>
            <Typography tag="small" color="text-500" id={`${id}-help`}>
              {description.phone}
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
      <InputValidationContainer
        id="register-email"
        validationMessages={validationMessages.email}
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup error={isError} required>
            <Label htmlFor={id}>{label.email}</Label>
            <Typography tag="small" color="text-500" id={`${id}-help`}>
              {description.email}
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
      <InputValidationContainer
        id="register-password"
        validationMessages={validationMessages.password}
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup error={isError} required>
            <Label htmlFor={id}>{label.password}</Label>
            <Typography tag="small" color="text-500" id={`${id}-help`}>
              {description.password}
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
      <SubmitButton className={styles["submit-btn"]}>
        {label.submit}
      </SubmitButton>
    </form>
  );
};
