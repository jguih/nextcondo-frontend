import { FC, Fragment } from "react";
import { ThemeToggle } from "@/src/theme/components/theme-toggle";
import styles from "./styles.module.scss";
import { RegisterUserForm } from "@/src/features/page/register/components/registerForm/server";
import { Typography } from "@/src/components/typography/typography";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { Link } from "@/src/components/link/link";

const Register: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  return (
    <Fragment>
      <div className={styles["title-container"]}>
        <Typography tag="h1">{d.page.register.title}</Typography>
        <ThemeToggle />
      </div>
      <div>
        <Typography tag="small" muted>
          {d.page.register.subtitle}{" "}
        </Typography>
        <Link href={"/login"}>{d.page.register.subtitle_action}</Link>
      </div>
      <RegisterUserForm d={d} />
    </Fragment>
  );
};

export default Register;
