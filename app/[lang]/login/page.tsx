import { FC, Fragment } from "react";
import { getDictionary } from "../../../src/localization/dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";
import { LoginForm } from "@/src/page/login/components/loginForm/server";
import { Typography } from "@/src/shared/components/typography/typography";
import { Link } from "@/src/shared/components/link/link";
import { ThemeToggle } from "@/src/theme/components/theme-toggle";
import styles from "./styles.module.scss";
import { getMeAsync } from "@/src/data/users/server";
import { redirect } from "next/navigation";

const Login: FC<WithLocale> = async ({ params: { lang } }) => {
  const { success } = await getMeAsync();
  if (success) {
    redirect("/");
  }
  const d = await getDictionary(lang);
  return (
    <Fragment>
      <div className={styles["title-container"]}>
        <Typography tag="h1">{d.page.login.title}</Typography>
        <ThemeToggle />
      </div>
      <div>
        <Typography tag="small" muted>
          {d.page.login.subtitle}{" "}
        </Typography>
        <Link href={"/register"}>{d.page.login.subtitle_action}</Link>
      </div>
      <LoginForm d={d} />
      {/* <Divider sx={{ mt: 4, mb: 4 }}>{d.common.or}</Divider>
      <SocialLoginList /> */}
    </Fragment>
  );
};

export default Login;
