import { FC } from "react";
import {
  LoginForm as ClientLoginForm,
  LoginFormEmail,
  LoginFormPassword,
  LoginFormError,
} from "./client";
import styles from "./styles.module.scss";
import { SubmitButton } from "@/src/components/button/submit/submit";
import { Typography } from "@/src/components/typography/typography";
import { Dictionary } from "@/src/features/localization/types";
import { Link } from "@/src/components/link/link";

export const LoginForm: FC<{ d: Dictionary }> = ({ d }) => {
  return (
    <ClientLoginForm
      error={
        <LoginFormError message={d.validation.invalid_login_credentials} />
      }
    >
      <LoginFormEmail
        label={d.auth.email}
        validationMessages={{
          typeMismatch: d.validation.input_validation_email_required,
          valueMissing: d.validation.input_validation_email_required,
        }}
      />
      <LoginFormPassword
        label={d.auth.password}
        validationMessages={{
          valueMissing: d.page.login.input_validation_password_required,
        }}
      />
      <Link href={"/login"} className={styles["forgot-password"]}>
        {d.auth.forgot_password}
      </Link>
      <SubmitButton className={styles["submit-btn"]}>
        <Typography tag="p">{d.auth.login}</Typography>
      </SubmitButton>
    </ClientLoginForm>
  );
};
