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
import { Box, List, ListItem, ListItemContent, Typography } from "@mui/joy";
import { ErrorList } from "@/src/shared/forms/error-list";
import { SubmitButton } from "@/src/shared/components/utils/submit-button";

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
    password: {
      title: string;
      rules: string;
    };
  };
  validationMessages: {
    name: Required<Pick<ValidationMessages, "valueMissing">>;
    email: Required<Pick<ValidationMessages, "valueMissing">>;
    password: Required<Pick<ValidationMessages, "valueMissing">>;
  };
}

export const SignUpForm: FC<FormProps> = ({
  label,
  validationMessages,
  description,
}) => {
  const lang = useLocale();
  const [state, formAction] = useFormState<FormState, FormData>(
    (state, payload) => signUp.bind(null, state, payload, lang)(),
    {}
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
      description: (
        <Box>
          <Typography level="body-sm">{description.password.title}</Typography>
          <List sx={{ pt: 0 }} size="sm">
            {description.password.rules.split(",").map((text, index) => (
              <ListItem key={index}>
                <ListItemContent>
                  <Typography level="body-sm">{text}</Typography>
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        </Box>
      ),
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
