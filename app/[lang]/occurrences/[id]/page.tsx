import { Locale } from "@/i18n-config";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { OccurrenceCard } from "@/src/features/page/occurrences/id/components/occurrence-card";
import { OccurrencesService } from "@/src/services/nextcondo/occurrences/server";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { redirect } from "next/navigation";
import { FC } from "react";

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
  if (!occurrence) {
    redirect("/occurrences");
  }

  return (
    <Layout.Main>
      {occurrence && (
        <OccurrenceCard occurrence={occurrence} lang={lang} d={d} />
      )}
    </Layout.Main>
  );
};

export default OccurrenceByIdPage;
