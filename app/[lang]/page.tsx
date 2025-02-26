import { FC } from "react";
import { WithLocale } from "@/src/types/with-locale";
import styles from "./styles.module.scss";
import { redirect } from "next/navigation";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { Typography } from "@/src/components/typography/typography";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { Link } from "@/src/components/link/link";
import { CondominiumService } from "@/src/services/nextcondo/condominium/server";
import { HomePageContents } from "@/src/features/page/home/components/server";
import { AppSidebar } from "@/src/components/sidebar/app/sidebar";
import { AppSidebarHeader } from "@/src/components/sidebar/app/header";
import { AppSidebarContent } from "@/src/components/sidebar/app/content";
import {
  AppSidebarItemConfigurations,
  AppSidebarItemLogout,
} from "@/src/components/sidebar/app/items";
import {
  HomeBottomNavigationHome,
  HomeBottomNavigationMyProfile,
  HomeBottomNavigationNotifications,
} from "@/src/features/page/home/components/bottom-navigation";
import { CondominiumDropdown } from "@/src/components/condominiumDropdown/condominium-dropdown";

const Home: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const result = await CondominiumService.GetMineCurrentAsync();
  const currentCondo = result.success ? result.response.data : undefined;

  if (!currentCondo) {
    return (
      <Layout.Root>
        <Layout.Header>
          <Header title={d.page.home.welcome} />
        </Layout.Header>
        <AppSidebar>
          <AppSidebarHeader title={d.page.home.welcome} />
          <AppSidebarContent>
            <AppSidebarItemConfigurations
              label={d.side_drawer.configurations}
            />
            <AppSidebarItemLogout label={d.auth.logout} />
          </AppSidebarContent>
        </AppSidebar>
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
  }

  return (
    <Layout.RootWithBottomNav>
      <Layout.Header>
        <Header title={<CondominiumDropdown lang={lang} />} />
      </Layout.Header>
      <AppSidebar>
        <AppSidebarHeader title={currentCondo.name} />
        <AppSidebarContent>
          <AppSidebarItemConfigurations label={d.side_drawer.configurations} />
          <AppSidebarItemLogout label={d.auth.logout} />
        </AppSidebarContent>
      </AppSidebar>
      <main className={styles.main}>
        <HomePageContents d={d} />
      </main>
      <Layout.BottomNavigation>
        <HomeBottomNavigationHome label={d.bottom_nav.home} selected />
        <HomeBottomNavigationNotifications label={d.bottom_nav.notifications} />
        <HomeBottomNavigationMyProfile label={d.bottom_nav.my_profile} />
      </Layout.BottomNavigation>
    </Layout.RootWithBottomNav>
  );
};

export default Home;
