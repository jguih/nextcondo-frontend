"use client";
import { SubmitButton } from "@/src/shared/components/utils/submit-button";
import { FC } from "react";
import { useFormState } from "react-dom";
import { FormState, login } from "./login.action";
import { Layout } from "@/src/shared/forms/layout";
import { useLocale } from "@/src/localization/client/LangProvider";
import {
  InputWithValidation,
  InputWithValidationProps,
  ValidationMessages,
} from "@/src/shared/forms/input";
import { FormWithValidation } from "@/src/shared/forms/form";
import { ErrorList } from "@/src/shared/forms/error-list";
import { Box } from "@mui/joy";

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

  const inputs: InputWithValidationProps[] = [
    {
      name: "email",
      label: label.email,
      type: "email",
      required: true,
      validationMessages: validationMessages.email,
    },
    {
      name: "password",
      label: label.password,
      type: "password",
      required: true,
      validationMessages: validationMessages.password,
    },
  ];

  return (
    <FormWithValidation action={formAction}>
      <Layout.FormContent>
        {inputs.map((props, index) => (
          <InputWithValidation {...props} key={`${index}-${props.name}`} />
        ))}
      </Layout.FormContent>
      <Box sx={{ mt: state.error ? 2 : 4 }}>
        {state.error && <ErrorList errors={state.error.messages} />}
        <SubmitButton fullWidth>{label.submit}</SubmitButton>
      </Box>
    </FormWithValidation>
  );
};
