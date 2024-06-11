import { LoginAction } from "@/src/page/register/components/login-action";
import { Typography } from "@mui/joy";
import { FC, Fragment } from "react";
import { Form } from "@/src/page/register/form/form";
import { getDictionary } from "../dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";

const Register: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  return (
    <Fragment>
      <Typography level="h2">{d.page.register.title}</Typography>
      <LoginAction
        text={d.page.register.subtitle}
        linkText={d.page.register.subtitle_action}
      />
      <Form
        label={{
          email: d.auth.email,
          password: d.auth.password,
          fullName: d.page.register.full_name,
          phone: d.page.register.phone,
          submit: d.page.register.submit,
        }}
      />
    </Fragment>
  );
};

export default Register;
