import { Dictionary } from "@/src/localization/dictionary";
import { format } from "@/src/localization/utils";
import { IValidator } from "@/src/shared/validation/IValidator";
import { ValidationState } from "@/src/shared/validation/ValidationState";
import { z } from "zod";

export class LoginValidator implements IValidator<LoginCredentials> {
  d: Dictionary;
  schema: ReturnType<typeof getSchema>;

  constructor(d: Dictionary) {
    this.d = d;
    this.schema = getSchema(d);
  }

  async validate(
    formData: FormData
  ): Promise<ValidationState<LoginCredentials, ErrorState>> {
    const parsed = await this.schema.safeParseAsync(formData);
    if (!parsed.success) {
      const formatted = parsed.error.format();
      return {
        isError: true,
        errors: {
          email: formatted.email?._errors,
          password: formatted.password?._errors,
        },
      };
    }
    return {
      isError: false,
      data: parsed.data,
    };
  }

  async validatePartial<Key extends keyof LoginCredentials>(
    field: Key,
    value: any
  ): Promise<ValidationState<LoginCredentials[Key], string[]>> {
    const parsed = await this.schema.shape[field].safeParseAsync(value);
    if (!parsed.success) {
      const formatted = parsed.error.format();
      return {
        isError: true,
        errors: formatted._errors,
      };
    }
    return {
      isError: false,
      data: parsed.data as LoginCredentials[Key],
    };
  }
}

function getSchema(d: Dictionary) {
  return z.object({
    email: z
      .string({ message: d.validation.invalid_email })
      .email({ message: d.validation.invalid_email })
      .min(1, { message: d.validation.invalid_email }),
    password: z.number().min(8, {
      message: format(d.validation.password_too_short, { count: 8 }),
    }),
  });
}

export type LoginCredentials = z.infer<ReturnType<typeof getSchema>>;

export type ErrorState = Record<keyof LoginCredentials, string[] | undefined>;
