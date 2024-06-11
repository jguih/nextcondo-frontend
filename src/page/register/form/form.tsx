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
}

export const Form: FC<FormProps> = ({ label }) => {
  const [state, formAction] = useFormState<FormState, FormData>(signUp, {});

  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
      action={formAction}
    >
      <FormControl>
        <FormLabel>{label.fullName}</FormLabel>
        <Input type="text" name="name" required />
      </FormControl>
      <FormControl>
        <FormLabel>{label.phone}</FormLabel>
        <Input type="tel" name="phone" />
      </FormControl>
      <FormControl>
        <FormLabel>{label.email}</FormLabel>
        <Input type="email" name="email" required />
      </FormControl>
      <FormControl>
        <FormLabel>{label.password}</FormLabel>
        <Input
          type="password"
          name="password"
          required
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
