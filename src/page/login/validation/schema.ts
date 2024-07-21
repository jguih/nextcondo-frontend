import { z } from "zod";

export interface LoginCredencialsSchemaMessages {
  email: {
    invalid: string;
    required: string;
  };
  password: {
    invalid: string;
    required: string;
  };
}

export const getSchema = (messages: LoginCredencialsSchemaMessages) => {
  const { email, password } = messages;
  return z
    .object({
      email: z
        .string({
          invalid_type_error: email.invalid,
          required_error: email.required,
        })
        .email(email.invalid)
        .min(1, email.required),
      password: z
        .string({
          invalid_type_error: password.invalid,
          required_error: password.required,
        })
        .min(1, password.required),
    })
    .required();
};
