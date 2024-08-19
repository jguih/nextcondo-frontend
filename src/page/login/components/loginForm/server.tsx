import { Dictionary } from "@/src/localization/dictionary";
import { FC } from "react";
import { LoginForm as ClientLoginForm } from "./client";

export const LoginForm: FC<{ d: Dictionary }> = ({ d }) => {
  return (
    <ClientLoginForm
      label={{
        email: d.auth.email,
        password: d.auth.password,
      }}
      text={{
        submit: d.auth.login,
        recoverPassword: d.auth.forgot_password,
        error: d.validation.invalid_login_credentials,
      }}
      validationMessages={{
        email: {
          typeMismatch: d.validation.required_email,
          valueMissing: d.validation.required_email,
        },
        password: {
          valueMissing: d.validation.required_password,
        },
      }}
    />
  );
};
