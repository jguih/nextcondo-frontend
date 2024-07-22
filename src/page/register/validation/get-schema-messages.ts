import "server-only";
import { Dictionary } from "@/src/localization/dictionary";
import { CreateUserSchemaMessages } from "./schema";
import { format } from "@/src/localization/utils";

export const getSchemaMessages = (d: Dictionary): CreateUserSchemaMessages => {
  return {
    email: {
      invalid: d.validation.invalid_email,
      required: d.validation.required,
    },
    password: {
      invalid: d.validation.invalid,
      required: d.validation.required,
      too_short: format(d.validation.password_too_short, { count: 8 }),
    },
    name: {
      invalid: d.validation.invalid,
      required: d.validation.required,
      too_long: d.validation.invalid,
    },
    phone: {
      invalid: d.validation.invalid,
    },
  };
};
