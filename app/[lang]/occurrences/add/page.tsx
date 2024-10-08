import { Layout } from "@/src/components/layout/layout";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { AddOccurrenceForm } from "@/src/features/page/occurrences/add/components/form/server";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { WithLocale } from "@/src/types/with-locale";
import { redirect } from "next/navigation";
import { FC, Fragment } from "react";

const OccurrencesAddPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const d = await getDictionary(lang);

  return (
    <Fragment>
      <Layout.Main>
        <AddOccurrenceForm d={d} />
      </Layout.Main>
      <AppSnackbarDispatcher />
    </Fragment>
  );
};

export default OccurrencesAddPage;
