import { FC, Fragment } from "react";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { AddCondominiumForm } from "@/src/features/page/condominium/add/form/server";
import { Header } from "@/src/components/header/header";
import { GoBackButton } from "@/src/components/header/go-back-button";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";

const CondominiumAddPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);

  return (
    <Fragment>
      <Layout.Header>
        <Header
          title={d.page["condominium/add"].title}
          actionButton={<GoBackButton path="/" />}
        />
      </Layout.Header>
      <Layout.Main>
        <AddCondominiumForm d={d} />
      </Layout.Main>
      <AppSnackbarDispatcher />
    </Fragment>
  );
};

export default CondominiumAddPage;
