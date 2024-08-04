import { FC, Fragment } from "react";
import { getDictionary } from "../../../src/localization/dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";
import { LoginForm } from "@/src/page/login/components/loginForm/login-form";
import { Typography } from "@/src/shared/components/typography/typography";
import { Link } from "@/src/shared/components/link/link";

const Login: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  return (
    <Fragment>
      <Typography tag="h1">{d.page.login.title}</Typography>
      <Typography tag="small" color="text-500">
        {d.page.login.subtitle}{" "}
        <Link href={"/register"} size="inherit">
          {d.page.login.subtitle_action}
        </Link>
      </Typography>
      <LoginForm
        label={{
          email: d.auth.email,
          password: d.auth.password,
          submit: d.auth.login,
          recoverPassword: d.auth.forgot_password,
        }}
        validationMessages={{
          email: {
            typeMismatch: d.validation.required_email,
            valueMissing: d.validation.required_email,
          },
          password: {
            valueMissing: d.validation.required_password,
          },
        }}
      />
      {/* <Divider sx={{ mt: 4, mb: 4 }}>{d.common.or}</Divider>
      <SocialLoginList /> */}
    </Fragment>
  );
};

export default Login;
