import { FC, Fragment, PropsWithChildren } from "react";
import { Metadata } from "next";
import { Layout } from "@/src/components/layout/layout";
import { Header } from "@/src/components/header/header";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { GoBackButton } from "@/src/components/header/go-back-button";

export const metadata: Metadata = {
  title: "NextCondo | Add Condominium",
};

const CondominiumAddLayout: FC<PropsWithChildren<WithLocale>> = async ({
  children,
  params: { lang },
}) => {
  const d = await getDictionary(lang);

  return (
    <Fragment>
      <Layout.Header>
        <Header
          title={d.page["condominium/add"].title}
          actionButton={<GoBackButton />}
        />
      </Layout.Header>
      {children}
    </Fragment>
  );
};

export default CondominiumAddLayout;
