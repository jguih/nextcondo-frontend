import { FC, Fragment } from "react";
import { getDictionary } from "../../../src/localization/dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";
import { SignUpForm } from "@/src/page/register/components/signUpForm/signup-form";
import { format } from "@/src/localization/utils";
import { Typography } from "@/src/shared/components/typography/typography";
import { Link } from "@/src/shared/components/link/link";
import { ThemeToggle } from "@/src/theme/components/theme-toggle";
import styles from "./styles.module.scss";

const Register: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  return (
    <Fragment>
      <div className={styles["title-container"]}>
        <Typography tag="h1">{d.page.register.title}</Typography>
        <ThemeToggle />
      </div>
      <div>
        <Typography tag="small" muted>
          {d.page.register.subtitle}{" "}
        </Typography>
        <Link href={"/login"}>{d.page.register.subtitle_action}</Link>
      </div>
      <SignUpForm
        label={{
          email: d.auth.email,
          password: d.auth.password,
          name: d.page.register.full_name,
          phone: d.page.register.phone,
          submit: d.page.register.submit,
        }}
        goToLoginPageActionMessage={d.page.register.go_to_login_page}
        description={{
          phone: d.page.register.phone_description,
          email: d.page.register.email_description,
          password: format(d.page.register.password_description, {
            min: 8,
            max: 30,
          }),
        }}
        validationMessages={{
          email: {
            valueMissing: d.validation.required_email_without_example,
            typeMismatch: d.validation.required_email_without_example,
          },
          name: {
            valueMissing: d.validation.required_full_name,
          },
          password: {
            valueMissing: d.validation.required_new_password,
            tooShort: format(d.validation.password_too_short_plural, {
              count: 8,
            }),
            tooLong: format(d.validation.password_too_long_plural, {
              count: 30,
            }),
          },
        }}
      />
    </Fragment>
  );
};

export default Register;
