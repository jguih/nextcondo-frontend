"use client";
import { SubmitButton } from "@/src/shared/components/utils/submit-button";
import { Box, FormControl, FormLabel, Input, Typography } from "@mui/joy";
import { FC } from "react";
import { useFormState } from "react-dom";
import { FormState, login } from "./login-action";

interface FormProps {
  label: {
    email: string;
    password: string;
    submit: string;
  };
}

export const Form: FC<FormProps> = ({ label }) => {
  const [state, formAction] = useFormState<FormState, FormData>(login, {});

  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
      action={formAction}
    >
      <FormControl>
        <FormLabel>{label.email}</FormLabel>
        <Input type="email" name="email" required />
      </FormControl>
      <FormControl>
        <FormLabel>{label.password}</FormLabel>
        <Input type="password" name="password" required />
      </FormControl>
      {state.message && (
        <Typography level="body-sm" color="danger">
          {state.message}
        </Typography>
      )}
      <SubmitButton sx={{ mt: 2 }}>{label.submit}</SubmitButton>
    </Box>
  );
};
