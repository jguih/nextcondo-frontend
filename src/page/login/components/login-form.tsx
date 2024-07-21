"use client";
import { SubmitButton } from "@/src/shared/components/utils/submit-button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  List,
  ListItem,
  ListItemContent,
  Typography,
} from "@mui/joy";
import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormState } from "react-dom";
import { FormState, login } from "./login.action";
import { Layout } from "@/src/shared/components/forms/layout";

interface LoginFormProps {
  label: {
    email: string;
    password: string;
    submit: string;
  };
  lang: string;
}

export const LoginForm: FC<LoginFormProps> = ({ label, lang }) => {
  const [state, formAction] = useFormState<FormState, FormData>(
    (state, payload) => login.bind(null, state, payload, lang)(),
    {}
  );

  return (
    <Layout.Form action={formAction}>
      <EmailField label={label.email} />
      <PasswordField label={label.password} />
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
    </Layout.Form>
  );
};

interface EmailField {
  label: string;
}

const EmailField: FC<EmailField> = ({ label }) => {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validate = () => {
    if (!inputRef.current) return;
    const isValid = inputRef.current.checkValidity();
    if (!isValid) {
      setError(inputRef.current.validationMessage);
    } else {
      setError(null);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    validate();
    return;
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    validate();
    return;
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <FormControl error={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input
        type="email"
        name="email"
        required
        onBlur={handleBlur}
        onChange={handleChange}
        slotProps={{ input: { ref: inputRef } }}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const PasswordField: FC<{ label: string }> = ({ label }) => {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validate = () => {
    if (!inputRef.current) return;
    const isValid = inputRef.current.checkValidity();
    if (!isValid) {
      setError(inputRef.current.validationMessage);
    } else {
      setError(null);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    validate();
    return;
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    validate();
    return;
  };

  return (
    <FormControl error={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input
        type="password"
        name="password"
        required
        slotProps={{ input: { minLength: 8, ref: inputRef } }}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
