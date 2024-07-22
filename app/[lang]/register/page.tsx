import { LoginAction } from "@/src/page/register/components/login-action";
import { Typography } from "@mui/joy";
import { FC, Fragment } from "react";
import { getDictionary } from "../../../src/localization/dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";
import { SignUpForm } from "@/src/page/register/signup-form";
import { format } from "@/src/localization/utils";

const Register: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  return (
    <Fragment>
      <Typography level="h2">{d.page.register.title}</Typography>
      <LoginAction
        text={d.page.register.subtitle}
        linkText={d.page.register.subtitle_action}
      />
      <SignUpForm
        label={{
          email: d.auth.email,
          password: d.auth.password,
          fullName: d.page.register.full_name,
          phone: d.page.register.phone,
          submit: d.page.register.submit,
        }}
        description={{
          phone: d.validation.required_phone,
          email: d.validation.required_email,
          password: {
            title: d.page.register.password_must_have,
            rules: format(d.page.register.password_rules, {
              chars: 8,
              specials: 1,
              numbers: 1,
            }),
          },
        }}
        validationMessages={{
          email: {
            valueMissing: d.validation.required_email_without_example,
          },
          name: {
            valueMissing: d.validation.required_full_name,
          },
          password: {
            valueMissing: d.validation.required_new_password,
          },
        }}
      />
    </Fragment>
  );
};

export default Register;
