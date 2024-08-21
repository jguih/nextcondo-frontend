import { Dictionary } from "@/src/localization/dictionary";
import { FC } from "react";
import {
  LoginForm as ClientLoginForm,
  LoginFormEmail,
  LoginFormPassword,
} from "./client";
import { Link } from "@/src/shared/components/link/link";
import styles from "./styles.module.scss";
import { Typography } from "@/src/shared/components/typography/typography";
import { SubmitButton } from "@/src/shared/components/button/submit/submit";

export const LoginForm: FC<{ d: Dictionary }> = ({ d }) => {
  return (
    <ClientLoginForm
      forgotPassword={
        <Link href={"/login"} className={styles["forgot-password"]}>
          {d.auth.forgot_password}
        </Link>
      }
      error={
        <Typography color="danger" className={styles.error}>
          {d.validation.invalid_login_credentials}
        </Typography>
      }
      submit={
        <SubmitButton className={styles["submit-btn"]}>
          <Typography tag="p">{d.auth.login}</Typography>
        </SubmitButton>
      }
    >
      <LoginFormEmail
        label={d.auth.email}
        validationMessages={{
          typeMismatch: d.validation.required_email,
          valueMissing: d.validation.required_email,
        }}
      />
      <LoginFormPassword
        label={d.auth.password}
        validationMessages={{
          valueMissing: d.validation.required_password,
        }}
      />
    </ClientLoginForm>
  );
};
