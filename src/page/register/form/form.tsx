"use client";
import { Box, FormControl, FormLabel, Input, Typography } from "@mui/joy";
import { FC } from "react";
import { FormState, signUp } from "./signup-action";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/src/shared/components/utils/submit-button";

interface FormProps {
  label: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
    submit: string;
  };
  lang: string;
}

export const Form: FC<FormProps> = ({ label, lang }) => {
  const [state, formAction] = useFormState<FormState, FormData>(
    (state, payload) => signUp.bind(null, state, payload, lang)(),
    {}
  );

  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
      action={formAction}
    >
      <FormControl required>
        <FormLabel>{label.fullName}</FormLabel>
        <Input type="text" name="name" />
      </FormControl>
      <FormControl>
        <FormLabel>{label.phone}</FormLabel>
        <Input type="tel" name="phone" />
      </FormControl>
      <FormControl required>
        <FormLabel>{label.email}</FormLabel>
        <Input type="email" name="email" />
      </FormControl>
      <FormControl required>
        <FormLabel>{label.password}</FormLabel>
        <Input
          type="password"
          name="password"
          slotProps={{ input: { minLength: 8 } }}
        />
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
    </Box>
  );
};
