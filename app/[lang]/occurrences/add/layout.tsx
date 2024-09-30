import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { Metadata } from "next";
import { FC, Fragment, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo | New Occurrence",
};

const OccurrencesAddLayout: FC<PropsWithChildren<WithLocale>> = async ({
  children,
  params: { lang },
}) => {
  const d = await getDictionary(lang);

  return (
    <Fragment>
      <Layout.Header>
        <Header
          title={d.page["occurrences/add"].title}
          actionButton={<GoBackButton path="/occurrences" />}
        />
      </Layout.Header>
      {children}
    </Fragment>
  );
};

export default OccurrencesAddLayout;
