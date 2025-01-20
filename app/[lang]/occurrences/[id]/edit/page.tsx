import { Locale } from "@/i18n-config";
import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { EditOccurrenceForm } from "@/src/features/page/occurrences/id/edit/components/form/server";
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

const OccurrenceByIdEditPage: FC<OccurrenceByIdPageProps> = async ({
  params: { id, lang },
}) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const d = await getDictionary(lang);
  const result = id ? await OccurrencesService.GetByIdAsync(id) : undefined;
  const occurrence = result?.success ? result.response?.data : undefined;
  if (!occurrence) {
    redirect("/occurrences");
  }

  return (
    <Fragment>
      <Layout.Header>
        <Header
          title={d.page["occurrences/[id]/edit"].title}
          actionButton={<GoBackButton />}
        />
      </Layout.Header>
      <Layout.Main>
        {occurrence && <EditOccurrenceForm d={d} occurrence={occurrence} />}
      </Layout.Main>
    </Fragment>
  );
};

export default OccurrenceByIdEditPage;
