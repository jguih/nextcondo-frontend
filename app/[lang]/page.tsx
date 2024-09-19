import { FC, Fragment } from "react";
import { WithLocale } from "@/src/types/with-locale";
import styles from "./styles.module.scss";
import { redirect } from "next/navigation";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { Typography } from "@/src/components/typography/typography";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import {
  AppSidebar,
  AppSidebarHeader,
  AppSidebarItemConfigurations,
  AppSidebarItemLogoutButton,
  AppSidebarItemThemeToggler,
} from "@/src/components/sidebar/app/app-sidebar";
import { Link } from "@/src/components/link/link";
import { CondominiumService } from "@/src/services/nextcondo/condominium/server";
import { HomePageContents } from "@/src/features/page/home/contents/server";
import { HomeBottomNavigation } from "@/src/features/page/home/contents/bottom-navigation";

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
    <Layout.RootWithBottomNav>
      <Layout.Header>
        <Header title={headerTitle} />
      </Layout.Header>
      <AppSidebar header={<AppSidebarHeader />}>
        <AppSidebarItemConfigurations label={d.side_drawer.configurations} />
        <AppSidebarItemThemeToggler label={d.side_drawer.change_theme} />
        <AppSidebarItemLogoutButton label={d.auth.logout} />
      </AppSidebar>
      <main className={styles.main}>
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
          <HomePageContents d={d} />
        )}
      </main>
      <Layout.BottomNavigation>
        <HomeBottomNavigation
          labels={{
            home: d.bottom_nav.home,
            myProfile: d.bottom_nav.my_profile,
            notifications: d.bottom_nav.notifications,
          }}
        />
      </Layout.BottomNavigation>
    </Layout.RootWithBottomNav>
  );
};

export default Home;
