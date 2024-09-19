import { Layout } from "@/src/components/layout/layout";
import { Typography } from "@/src/components/typography/typography";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { WithLocale } from "@/src/types/with-locale";
import { redirect } from "next/navigation";
import { FC } from "react";

const OccurrencesPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  await getDictionary(lang);

  return (
    <Layout.Main>
      <Typography>W.I.P</Typography>
    </Layout.Main>
  );
};

export default OccurrencesPage;
