import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { AddOccurrenceForm } from "@/src/features/page/occurrences/add/components/form/server";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { WithLocale } from "@/src/types/with-locale";
import { redirect } from "next/navigation";
import { FC } from "react";

const OccurrencesAddPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const d = await getDictionary(lang);

  return (
    <Layout.Main>
      <AddOccurrenceForm d={d} />
    </Layout.Main>
  );
};

export default OccurrencesAddPage;
