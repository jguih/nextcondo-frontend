import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { WithLocale } from "@/src/types/with-locale";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Occurrences",
};

const OccurrencesLayout: FC<PropsWithChildren<WithLocale>> = async ({
  params: { lang },
  children,
}) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  await getDictionary(lang);

  return (
    <Layout.Root>
      <Layout.Header>
        <Header title={"Occurrences"} actionButton={<GoBackButton />} />
      </Layout.Header>
      {children}
    </Layout.Root>
  );
};

export default OccurrencesLayout;