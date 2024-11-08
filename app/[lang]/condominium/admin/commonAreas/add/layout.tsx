import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { FC, PropsWithChildren } from "react";

const CondominiumAdminCommonAreasAddLayout: FC<
  PropsWithChildren<WithLocale>
> = async ({ params: { lang }, children }) => {
  await getDictionary(lang);

  return (
    <Layout.Root>
      <AppSnackbarDispatcher position="top" />
      <Layout.Header>
        <Header
          title={"Adicionar Área Comum"}
          actionButton={<GoBackButton path="/condominium/admin" />}
        />
      </Layout.Header>
      {children}
    </Layout.Root>
  );
};

export default CondominiumAdminCommonAreasAddLayout;
