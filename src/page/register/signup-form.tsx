"use client";
import { FC } from "react";
import { FormState, signUp } from "./signup.action";
import { useFormState } from "react-dom";
import { useLocale } from "@/src/localization/client/LangProvider";
import { Layout } from "@/src/shared/forms/layout";
import { FormWithValidation } from "@/src/shared/forms/form";
import {
  InputWithValidation,
  InputWithValidationProps,
  ValidationMessages,
} from "@/src/shared/forms/input";
import { Box, Button, Typography } from "@mui/joy";
import { SubmitButton } from "@/src/shared/components/utils/submit-button";
import { useRouter } from "next/navigation";

interface FormProps {
  label: {
    fullName: string;
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

  const inputs: InputWithValidationProps[] = [
    {
      name: "name",
      label: label.fullName,
      type: "text",
      required: true,
      validationMessages: validationMessages.name,
    },
    {
      name: "phone",
      label: label.phone,
      description: description.phone,
      type: "tel",
    },
    {
      name: "email",
      label: label.email,
      description: description.email,
      type: "email",
      required: true,
      validationMessages: validationMessages.email,
    },
    {
      name: "password",
      label: label.password,
      type: "password",
      description: description.password,
      required: true,
      minLength: 8,
      maxLength: 30,
      validationMessages: validationMessages.password,
    },
  ];

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
    <FormWithValidation action={formAction}>
      <Layout.FormContent>
        {inputs.map((props, index) => (
          <InputWithValidation {...props} key={`${index}-${props.name}`} />
        ))}
      </Layout.FormContent>
      <Box sx={{ mt: 2 }}>
        {state.error && (
          <Typography color="danger" sx={{ mb: 1 }}>
            {state.error.message}
          </Typography>
        )}
        <SubmitButton fullWidth>{label.submit}</SubmitButton>
      </Box>
    </FormWithValidation>
  );
};
