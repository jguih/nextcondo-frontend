import { z } from "zod";

export interface CreateUserSchemaMessages {
  email: {
    invalid: string;
    required: string;
  };
  password: {
    invalid: string;
    required: string;
    too_short: string;
  };
  name: {
    invalid: string;
    required: string;
    too_long: string;
  };
  phone: {
    invalid: string;
  };
}

export const getSchema = (messages: CreateUserSchemaMessages) => {
  const { email, password, name, phone } = messages;
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
        .min(8, password.too_short),
      name: z
        .string({
          invalid_type_error: name.invalid,
          required_error: name.required,
        })
        .max(255, name.too_long)
        .min(1, name.required),
      phone: z.string({ invalid_type_error: phone.invalid }),
    })
    .required();
};
