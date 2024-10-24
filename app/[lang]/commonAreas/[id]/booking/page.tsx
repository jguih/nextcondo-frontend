import { Locale } from "@/i18n-config";
import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { FC, Fragment } from "react";

const CommonAreaBookingPage: FC<{
  params: {
    id?: string;
    lang: Locale;
  };
}> = async ({ params }) => {
  return (
    <Fragment>
      <Layout.Header>
        <Header actionButton={<GoBackButton path="/commonAreas" />} />
      </Layout.Header>
      <Layout.Main>{params.id}</Layout.Main>
    </Fragment>
  );
};

export default CommonAreaBookingPage;
