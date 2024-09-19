import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";
import { Layout } from "@/src/components/layout/layout";
import { Header } from "@/src/components/header/header";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { redirect } from "next/navigation";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { GoBackButton } from "@/src/components/header/go-back-button";

export const metadata: Metadata = {
  title: "NextCondo | Add Condominium",
};

const CondominiumAddLayout: FC<PropsWithChildren<WithLocale>> = async ({
  children,
  params: { lang },
}) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const d = await getDictionary(lang);

  return (
    <Layout.RootWithBottomNav>
      <Layout.Header>
        <Header
          title={d.page.add_condominium.title}
          actionButton={<GoBackButton />}
        />
      </Layout.Header>
      {children}
    </Layout.RootWithBottomNav>
  );
};

export default CondominiumAddLayout;