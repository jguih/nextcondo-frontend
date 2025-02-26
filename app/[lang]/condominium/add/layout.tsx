import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import {
  BottomNavigationAddCondominium,
  BottomNavigationMyCondominiums,
} from "@/src/features/page/condominium/components/bottom-navigation";
import { WithLocale } from "@/src/types/with-locale";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Condominium Add",
};

const CondominiumManageLayout: FC<PropsWithChildren<WithLocale>> = async ({
  params: { lang },
  children,
}) => {
  const d = await getDictionary(lang);

  return (
    <Layout.RootWithBottomNav>
      <Layout.Header>
        <Header
          title={d.page["condominium/add"].title}
          actionButton={<GoBackButton path="/" />}
        />
      </Layout.Header>
      {children}
      <Layout.BottomNavigation>
        <BottomNavigationMyCondominiums label={d.bottom_nav.my_condominiums} />
        <BottomNavigationAddCondominium
          label={d.bottom_nav.add_condominium}
          selected
        />
      </Layout.BottomNavigation>
    </Layout.RootWithBottomNav>
  );
};

export default CondominiumManageLayout;
