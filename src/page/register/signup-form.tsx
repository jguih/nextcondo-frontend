"use client";
import { FC } from "react";
import { FormState, signUp } from "./signup.action";
import { useFormState } from "react-dom";
import { useLocale } from "@/src/localization/client/LangProvider";
import { ValidationMessages } from "@/src/shared/forms/input";
import { Box, Button, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/src/shared/components/validation/submit-custom-validation";
import { InputValidationContainer } from "@/src/shared/components/validation/input-validation-container";
import { FormGroup } from "@/src/shared/components/formGroup/form-group";
import { Label } from "@/src/shared/components/label/label";
import { Input } from "@/src/shared/components/input/input";
import { HelperText } from "@/src/shared/components/typography/helperText/helper-text";
import { SubmitButton } from "@/src/shared/components/button/submit/submit-button";

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
      <Box
        sx={{
          marginTop: "auto",
          display: "block",
        }}
      >
        <Typography level="body-md" color="success">
          {state.message}
        </Typography>
        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {
            router.push("/login");
          }}
        >
          {goToLoginPageActionMessage}
        </Button>
      </Box>
    );
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate>
      <InputValidationContainer
        id="register-name"
        validationMessages={validationMessages.name}
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup error={isError}>
            <Label required htmlFor={id}>
              {label.name}
            </Label>
            <Input
              id={id}
              name="name"
              type="text"
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
        id="register-phone"
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup error={isError}>
            <Label htmlFor={id}>{label.phone}</Label>
            <HelperText id={`${id}-help`}>{description.phone}</HelperText>
            <Input
              id={id}
              name="phone"
              type="tel"
              error={isError}
              aria-describedby={`${id}-help`}
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
        id="register-email"
        validationMessages={validationMessages.email}
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup error={isError}>
            <Label required htmlFor={id}>
              {label.email}
            </Label>
            <HelperText id={`${id}-help`}>{description.email}</HelperText>
            <Input
              id={id}
              name="email"
              type="email"
              required
              error={isError}
              aria-describedby={`${id}-help`}
              {...inputProps}
            />
            {isError && <HelperText error>{errorMessage}</HelperText>}
          </FormGroup>
        )}
      />
      <InputValidationContainer
        id="register-password"
        validationMessages={validationMessages.password}
        render={({ id, errorMessage, isError, ...inputProps }) => (
          <FormGroup error={isError}>
            <Label required htmlFor={id}>
              {label.password}
            </Label>
            <HelperText id={`${id}-help`}>{description.password}</HelperText>
            <Input
              id={id}
              name="password"
              type="password"
              required
              minLength={8}
              maxLength={30}
              error={isError}
              aria-describedby={`${id}-help`}
              {...inputProps}
            />
            {isError && <HelperText error>{errorMessage}</HelperText>}
          </FormGroup>
        )}
      />
      <SubmitButton
        style={{ marginTop: "calc(var(--spacing)*2)", width: "100%" }}
      >
        {label.submit}
      </SubmitButton>
    </form>
  );
};
