"use client";
import { SubmitButton } from "@/src/shared/components/utils/submit-button";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  ListItemContent,
  Typography,
} from "@mui/joy";
import { FC } from "react";
import { useFormState } from "react-dom";
import { FormState, login } from "./login-action";

interface FormProps {
  label: {
    email: string;
    password: string;
    submit: string;
  };
  lang: string;
}

export const Form: FC<FormProps> = ({ label, lang }) => {
  const [state, formAction] = useFormState<FormState, FormData>(
    (state, payload) => login.bind(null, state, payload, lang)(),
    {}
  );

  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
      action={formAction}
    >
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
      <SubmitButton sx={{ mt: 2 }}>{label.submit}</SubmitButton>
    </Box>
  );
};
