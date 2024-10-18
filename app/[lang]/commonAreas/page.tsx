import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { WithLocale } from "@/src/types/with-locale";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FC, Fragment } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Common Areas",
};

const CommonAreasPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const d = await getDictionary(lang);
  const result = await CommonAreasService.GetAsync();
  const commonAreaList =
    result.success && result.hasData ? result.response.data : [];

  return (
    <Fragment>
      <Layout.Header>
        <Header
          title={d.page.commonAreas.title}
          actionButton={<GoBackButton path="/" />}
        />
      </Layout.Header>
      <Layout.Main>
        <pre>{JSON.stringify(commonAreaList, null, 2)}</pre>
      </Layout.Main>
    </Fragment>
  );
};

export default CommonAreasPage;
