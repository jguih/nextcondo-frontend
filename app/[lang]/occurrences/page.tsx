import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { AddOccurrenceButton } from "@/src/features/page/occurrences/components/add-occurrence-button";
import { OccurrencesList } from "@/src/features/page/occurrences/components/occurrences-list";
import { OccurrencesService } from "@/src/services/nextcondo/occurrences/server";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { WithLocale } from "@/src/types/with-locale";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FC, Fragment } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Occurrences",
};

const OccurrencesPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const d = await getDictionary(lang);
  const result = await OccurrencesService.GetAsync();
  const occurrenceList =
    result.success && result.hasData ? result.response.data : [];

  return (
    <Fragment>
      <Layout.Header>
        <Header
          title={d.page.occurrences.title}
          actionButton={<GoBackButton />}
        />
      </Layout.Header>
      <Layout.Main>
        <AddOccurrenceButton />
        <OccurrencesList occurrenceList={occurrenceList} />
      </Layout.Main>
    </Fragment>
  );
};

export default OccurrencesPage;
