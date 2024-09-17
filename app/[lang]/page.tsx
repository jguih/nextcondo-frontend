import { FC } from "react";
import { WithLocale } from "@/src/types/with-locale";
import styles from "./styles.module.scss";
import { redirect } from "next/navigation";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { Typography } from "@/src/components/typography/typography";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { AppSidebar } from "@/src/components/sidebar/app/app-sidebar";
import { Link } from "@/src/components/link/link";
import { CondominiumService } from "@/src/services/nextcondo/condominium/server";

const Home: FC<WithLocale> = async ({ params: { lang } }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const userCondominiums = await CondominiumService.GetMineAsync();
  const d = await getDictionary(lang);

  return (
    <Layout.Root>
      <Layout.Header>
        <Header title={d.page.home.welcome} />
      </Layout.Header>
      <AppSidebar />
      <Layout.Main className={styles.main}>
        <Typography tag="p">{d.page.home.no_property_added}</Typography>
        <Link
          className={styles["add-condo-btn"]}
          href={"/condominium/add"}
          variant="solid"
          color="primary"
        >
          {d.page.home.add_property}
        </Link>
      </Layout.Main>
    </Layout.Root>
  );
};

export default Home;
