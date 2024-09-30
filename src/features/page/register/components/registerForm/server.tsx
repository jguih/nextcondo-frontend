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
          {d.page.register.error}
        </Typography>
      }
      submit={
        <SubmitButton className={styles["submit-btn"]}>
          <Typography tag="p">{d.page.register.create_account}</Typography>
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
        label={d.page.register.input_label_fullName}
        validationMessages={{
          valueMissing: d.validation.input_validation_fullName_required,
        }}
      />
      <RegisterFormPhone
        label={d.page.register.input_label_phone}
        description={d.page.register.input_description_phone}
      />
      <RegisterFormEmail
        label={d.auth.email}
        description={d.page.register.input_description_email}
        validationMessages={{
          valueMissing:
            d.validation.input_validation_email_required_withoutExample,
          typeMismatch:
            d.validation.input_validation_email_required_withoutExample,
        }}
      />
      <RegisterFormPassword
        label={d.auth.password}
        description={format(d.page.register.input_description_password, {
          min: 8,
          max: 30,
        })}
        validationMessages={{
          valueMissing: d.page.register.input_validation_password_required,
          tooShort: format(
            d.validation.input_validation_password_tooShortPlural,
            {
              count: 8,
            }
          ),
          tooLong: format(
            d.validation.input_validation_password_tooLongPlural,
            {
              count: 30,
            }
          ),
        }}
      />
    </ClientRegisterUserForm>
  );
};
