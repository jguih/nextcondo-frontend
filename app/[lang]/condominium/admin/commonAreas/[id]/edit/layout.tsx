import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { FC, PropsWithChildren } from "react";

const CondominiumAdminCommonAreasEditLayout: FC<
  PropsWithChildren<WithLocale>
> = async ({ params: { lang }, children }) => {
  await getDictionary(lang);

  return (
    <Layout.Root>
      <AppSnackbarDispatcher />
      <Layout.Header>
        <Header
          title={"Editar Área Comum"}
          actionButton={<GoBackButton path="/condominium/admin" />}
        />
      </Layout.Header>
      {children}
    </Layout.Root>
  );
};

export default CondominiumAdminCommonAreasEditLayout;
