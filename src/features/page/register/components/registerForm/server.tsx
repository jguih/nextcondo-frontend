import { FC } from "react";
import {
  RegisterUserForm as ClientRegisterUserForm,
  RegisterFormEmail,
  RegisterFormFullName,
  RegisterFormPassword,
  RegisterFormPhone,
} from "./client";
import styles from "./styles.module.scss";
import { SubmitButton } from "@/src/components/button/submit/submit";
import { Typography } from "@/src/components/typography/typography";
import { Dictionary } from "@/src/features/localization/types";
import { Success } from "./success";
import { format } from "@/src/features/localization/utils";

export const RegisterUserForm: FC<{ d: Dictionary }> = ({ d }) => {
  return (
    <ClientRegisterUserForm
      error={
        <Typography color="danger" tag="p" className={styles["error-msg"]}>
          {d.page.register.fail}
        </Typography>
      }
      submit={
        <SubmitButton className={styles["submit-btn"]}>
          <Typography tag="p">{d.page.register.submit}</Typography>
        </SubmitButton>
      }
      success={
        <Success
          successMessage={d.page.register.success}
          goToLoginPageActionMessage={d.page.register.go_to_login_page}
        />
      }
    >
      <RegisterFormFullName
        label={d.page.register.full_name}
        validationMessages={{
          valueMissing: d.validation.required_full_name,
        }}
      />
      <RegisterFormPhone
        label={d.page.register.phone}
        description={d.page.register.phone_description}
      />
      <RegisterFormEmail
        label={d.auth.email}
        description={d.page.register.email_description}
        validationMessages={{
          valueMissing: d.validation.required_email_without_example,
          typeMismatch: d.validation.required_email_without_example,
        }}
      />
      <RegisterFormPassword
        label={d.auth.password}
        description={format(d.page.register.password_description, {
          min: 8,
          max: 30,
        })}
        validationMessages={{
          valueMissing: d.validation.required_new_password,
          tooShort: format(d.validation.password_too_short_plural, {
            count: 8,
          }),
          tooLong: format(d.validation.password_too_long_plural, {
            count: 30,
          }),
        }}
      />
    </ClientRegisterUserForm>
  );
};
