"use client";
import { SubmitButton } from "@/src/shared/components/utils/submit-button";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  List,
  ListItem,
  ListItemContent,
  Typography,
} from "@mui/joy";
import { FC } from "react";
import { useFormState } from "react-dom";
import { FormState, login } from "./login.action";
import { Layout } from "@/src/shared/components/forms/layout";
import { z } from "zod";
import { useLocale } from "@/src/localization/client/LangProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSchema, LoginCredencialsSchemaMessages } from "./validation/schema";

interface LoginFormProps {
  label: {
    email: string;
    password: string;
    submit: string;
  };
  schemaMessages: LoginCredencialsSchemaMessages;
}

export const LoginForm: FC<LoginFormProps> = ({ label, schemaMessages }) => {
  const lang = useLocale();
  const credentialsSchema = getSchema(schemaMessages);
  const [state, formAction] = useFormState<FormState, FormData>(
    (state, payload) => login.bind(null, state, payload, lang)(),
    {}
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
  });

  const handleAction = (formData: FormData) => {
    handleSubmit(async () => {
      await formAction(formData);
    })();
  };

  return (
    <Box component={"form"} action={handleAction}>
      <Layout.FormContent>
        <FormControl error={errors.email !== undefined}>
          <FormLabel>{label.email}</FormLabel>
          <Input
            slotProps={{ input: { ...register("email"), type: "email" } }}
          />
          {errors.email && (
            <FormHelperText>{errors.email.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={errors.password !== undefined}>
          <FormLabel>{label.password}</FormLabel>
          <Input
            slotProps={{ input: { ...register("password"), type: "password" } }}
          />
          {errors.password && (
            <FormHelperText>{errors.password.message}</FormHelperText>
          )}
        </FormControl>
        {state.error && (
          <List>
            {state.error.message.map((message) => {
              return (
                <ListItem>
                  <ListItemContent>
                    <Typography level="body-sm" color="danger">
                      {message}
                    </Typography>
                  </ListItemContent>
                </ListItem>
              );
            })}
          </List>
        )}
        <SubmitButton>{label.submit}</SubmitButton>
      </Layout.FormContent>
    </Box>
  );
};
