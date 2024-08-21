import { FC, Fragment } from "react";
import { getDictionary } from "../../../src/localization/dictionaries";
import { WithLocale } from "@/src/shared/types/with-locale";
import { Typography } from "@/src/shared/components/typography/typography";
import { Link } from "@/src/shared/components/link/link";
import { ThemeToggle } from "@/src/theme/components/theme-toggle";
import styles from "./styles.module.scss";
import { RegisterUserForm } from "@/src/page/register/components/registerForm/server";

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
