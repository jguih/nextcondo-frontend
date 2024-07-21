import { Divider, Link, Typography } from "@mui/joy";
import { FC, Fragment } from "react";
import { RegisterAction } from "@/src/page/login/components/register-action";
import { getDictionary } from "../../../src/localization/dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";
import { SocialLoginList } from "@/src/page/login/components/social-login-list";
import { LoginForm } from "@/src/page/login/components/login-form";
import { LoginValidator } from "@/src/page/login/validation/LoginValidator";

const Login: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  const loginValidator = new LoginValidator(d);
  const test = await loginValidator.validatePartial("password", "");

  if (test.isError) {
    test.errors;
  } else {
    test.data;
  }

  return (
    <Fragment>
      <Typography level="h2">{d.page.login.title}</Typography>
      <RegisterAction
        text={d.page.login.subtitle}
        linkText={d.page.login.subtitle_action}
      />
      <LoginForm
        label={{
          email: d.auth.email,
          password: d.auth.password,
          submit: d.auth.login,
        }}
        lang={lang}
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
      <SocialLoginList />
    </Fragment>
  );
};

export default Login;
