import { Link } from "@mui/joy";
import { FC, Fragment } from "react";
import { RegisterAction } from "@/src/page/login/components/register-action";
import { getDictionary } from "../../../src/localization/dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";
import { LoginForm } from "@/src/page/login/login-form";

const Login: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  return (
    <Fragment>
      <h3>{d.page.login.title}</h3>
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
      <Link
        level="body-sm"
        sx={{
          display: "block",
          width: "fit-content",
          ml: "auto",
          mt: 1,
        }}
      >
        {d.auth.forgot_password}
      </Link>
      {/* <Divider sx={{ mt: 4, mb: 4 }}>{d.common.or}</Divider>
      <SocialLoginList /> */}
    </Fragment>
  );
};

export default Login;
