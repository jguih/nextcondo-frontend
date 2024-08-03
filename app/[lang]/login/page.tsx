import { FC, Fragment } from "react";
import { getDictionary } from "../../../src/localization/dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";
import Link from "next/link";
import { LoginForm } from "@/src/page/login/components/loginForm/login-form";

const Login: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  return (
    <Fragment>
      <h3>{d.page.login.title}</h3>
      <small style={{ color: "var(--text-500)" }}>
        {d.page.login.subtitle}{" "}
        <Link href={"/register"} style={{ fontSize: "var(--text-small)" }}>
          {d.page.login.subtitle_action}
        </Link>
      </small>
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
