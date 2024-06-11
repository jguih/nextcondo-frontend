import { Divider, Link, Typography } from "@mui/joy";
import { FC, Fragment } from "react";
import { RegisterAction } from "@/src/page/login/components/register-action";
import { Form } from "@/src/page/login/form/form";
import { getDictionary } from "../dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";

const Login: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  return (
    <Fragment>
      <Typography level="h2">{d.page.login.title}</Typography>
      <RegisterAction
        text={d.page.login.subtitle}
        linkText={d.page.login.subtitle_action}
      />
      <Form
        label={{
          email: d.auth.email,
          password: d.auth.password,
          submit: d.auth.login,
        }}
      />
      <Link
        level="body-sm"
        sx={{
          display: "block",
          width: "fit-content",
          ml: "auto",
          mr: "auto",
          mt: 1,
        }}
      >
        {d.auth.forgot_password}
      </Link>
      <Divider sx={{ mt: 4, mb: 4 }}>{d.common.or}</Divider>
    </Fragment>
  );
};

export default Login;
