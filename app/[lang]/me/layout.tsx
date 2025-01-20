import { Locale } from "@/i18n-config";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { AppSidebarContent } from "@/src/components/sidebar/app/content";
import { AppSidebarHeader } from "@/src/components/sidebar/app/header";
import {
  AppSidebarItemConfigurations,
  AppSidebarItemLogout,
} from "@/src/components/sidebar/app/items";
import { AppSidebar } from "@/src/components/sidebar/app/sidebar";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import {
  HomeBottomNavigationHome,
  HomeBottomNavigationMyProfile,
  HomeBottomNavigationNotifications,
} from "@/src/features/page/home/components/bottom-navigation";
import { CondominiumService } from "@/src/services/nextcondo/condominium/server";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo | User Profile",
};

const MeLayout: FC<PropsWithChildren<{ params: { lang: Locale } }>> = async ({
  children,
  params: { lang },
}) => {
  const d = await getDictionary(lang);
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const result = await CondominiumService.GetMineCurrentAsync();
  const currentCondo = result.success ? result.response.data : undefined;

  if (!currentCondo) {
    throw new Error("Current condominium not found");
  }

  return (
    <Layout.RootWithBottomNav>
      <Layout.Header>
        <Header title={d.bottom_nav.my_profile} />
      </Layout.Header>
      <AppSidebar>
        <AppSidebarHeader title={currentCondo.name} />
        <AppSidebarContent>
          <AppSidebarItemConfigurations label={d.side_drawer.configurations} />
          <AppSidebarItemLogout label={d.auth.logout} />
        </AppSidebarContent>
      </AppSidebar>
      {children}
      <Layout.BottomNavigation>
        <HomeBottomNavigationHome label={d.bottom_nav.home} />
        <HomeBottomNavigationNotifications label={d.bottom_nav.notifications} />
        <HomeBottomNavigationMyProfile
          label={d.bottom_nav.my_profile}
          selected
        />
      </Layout.BottomNavigation>
    </Layout.RootWithBottomNav>
  );
};

export default MeLayout;
