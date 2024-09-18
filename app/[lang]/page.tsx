import { FC, Fragment } from "react";
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
import { HomePageContents } from "@/src/features/page/home/contents/server";

const Home: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const result = await CondominiumService.GetMineCurrentAsync();
  const currentCondo = result.success ? result.response.data : undefined;
  const headerTitle = currentCondo ? currentCondo.name : d.page.home.welcome;

  return (
    <Layout.Root>
      <Layout.Header>
        <Header title={headerTitle} />
      </Layout.Header>
      <AppSidebar />
      <Layout.Main className={styles.main}>
        {!currentCondo ? (
          <Fragment>
            <Typography tag="p">{d.page.home.no_property_added}</Typography>
            <Link
              className={styles["add-condo-btn"]}
              href={"/condominium/add"}
              variant="solid"
              color="primary"
            >
              {d.page.home.add_property}
            </Link>
          </Fragment>
        ) : (
          <HomePageContents />
        )}
      </Layout.Main>
    </Layout.Root>
  );
};

export default Home;
