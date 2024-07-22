import { LoginAction } from "@/src/page/register/components/login-action";
import { Typography } from "@mui/joy";
import { FC, Fragment } from "react";
import { getDictionary } from "../../../src/localization/dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";
import { SignUpForm } from "@/src/page/register/signup-form";
import { getSchemaMessages } from "@/src/page/register/validation/get-schema-messages";

const Register: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  const schemaMessages = getSchemaMessages(d);
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
        schemaMessages={schemaMessages}
      />
    </Fragment>
  );
};

export default Register;
