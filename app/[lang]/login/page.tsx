import { FC, Fragment } from "react";
import { WithLocale } from "@/src/types/with-locale";
import { LoginForm } from "@/src/features/page/login/components/loginForm/server";
import { redirect } from "next/navigation";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { Typography } from "@/src/components/typography/typography";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { Link } from "@/src/components/link/link";

const Login: FC<WithLocale> = async ({ params: { lang } }) => {
  const user = await UsersService.GetMeAsync();
  if (user) {
    redirect("/");
  }
  const d = await getDictionary(lang);

  return (
    <Fragment>
      <Typography tag="h1">{d.page.login.title}</Typography>
      <div>
        <Typography tag="small" muted>
          {d.page.login.subtitle}{" "}
        </Typography>
        <Link href={"/register"}>{d.page.login.subtitle_action}</Link>
      </div>
      <LoginForm d={d} />
    </Fragment>
  );
};

export default Login;
