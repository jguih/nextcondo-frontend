import { Locale } from "@/i18n-config";
import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { Typography } from "@/src/components/typography/typography";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { OccurrenceCard } from "@/src/features/page/occurrences/id/components/card/occurrence-card";
import { OccurrencesService } from "@/src/services/nextcondo/occurrences/server";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FC, Fragment } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Occurrences",
};

type OccurrenceByIdPageProps = {
  params: {
    id?: string;
    lang: Locale;
  };
};

const OccurrenceByIdPage: FC<OccurrenceByIdPageProps> = async ({
  params: { id, lang },
}) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const d = await getDictionary(lang);
  const result = id ? await OccurrencesService.GetByIdAsync(id) : undefined;
  const occurrence = result?.success ? result.response?.data : undefined;

  return (
    <Fragment>
      <Layout.Header>
        <Header
          title={d.page.occurrences.title}
          actionButton={<GoBackButton path="/occurrences" />}
        />
      </Layout.Header>
      <Layout.Main>
        {occurrence ? (
          <OccurrenceCard occurrence={occurrence} lang={lang} d={d} />
        ) : (
          <Typography color="danger">Occurrence not found :/</Typography>
        )}
      </Layout.Main>
    </Fragment>
  );
};

export default OccurrenceByIdPage;
