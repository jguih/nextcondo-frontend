"use client";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";
import { FC } from "react";
import { FormState, signUp } from "./signup.action";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/src/shared/components/utils/submit-button";
import { useLocale } from "@/src/localization/client/LangProvider";
import { CreateUserSchemaMessages, getSchema } from "./validation/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/src/shared/forms/layout";

interface FormProps {
  label: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
    submit: string;
  };
  schemaMessages: CreateUserSchemaMessages;
}

export const SignUpForm: FC<FormProps> = ({ label, schemaMessages }) => {
  const lang = useLocale();
  const schema = getSchema(schemaMessages);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const [state, formAction] = useFormState<FormState, FormData>(
    (state, payload) => signUp.bind(null, state, payload, lang)(),
    {}
  );

  const handleAction = (formData: FormData) => {
    handleSubmit(async () => {
      await formAction(formData);
    })();
  };

  return (
    <Box component={"form"} action={handleAction}>
      <Layout.FormContent>
        <FormControl error={errors.name !== undefined}>
          <FormLabel required>{label.fullName}</FormLabel>
          <Input slotProps={{ input: { ...register("name"), type: "text" } }} />
          {errors.name && (
            <FormHelperText>{errors.name.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={errors.phone !== undefined}>
          <FormLabel>{label.phone}</FormLabel>
          <Input slotProps={{ input: { ...register("phone"), type: "tel" } }} />
          {errors.phone && (
            <FormHelperText>{errors.phone.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={errors.email !== undefined}>
          <FormLabel required>{label.email}</FormLabel>
          <Input
            slotProps={{ input: { ...register("email"), type: "email" } }}
          />
          {errors.email && (
            <FormHelperText>{errors.email.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={errors.password !== undefined}>
          <FormLabel required>{label.password}</FormLabel>
          <Input
            slotProps={{ input: { ...register("password"), type: "password" } }}
          />
          {errors.password && (
            <FormHelperText>{errors.password.message}</FormHelperText>
          )}
        </FormControl>
        {state.error && (
          <Typography level="body-sm" color="danger">
            {state.error.message}
          </Typography>
        )}
        {state.message && !state.error && (
          <Typography level="body-sm" color="success">
            {state.message}
          </Typography>
        )}
        <SubmitButton sx={{ mt: 2 }}>{label.submit}</SubmitButton>
      </Layout.FormContent>
    </Box>
  );
};
