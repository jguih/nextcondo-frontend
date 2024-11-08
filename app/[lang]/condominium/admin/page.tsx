import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { Link } from "@/src/components/link/link";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { FC } from "react";

const CondominiumAdminPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);

  return (
    <Layout.Root>
      <AppSnackbarDispatcher position="top" />
      <Layout.Header>
        <Header
          title={d.page["condominium/admin"].title}
          actionButton={<GoBackButton path="/" />}
        />
      </Layout.Header>
      <Layout.Main>
        <Link href={"/condominium/admin/commonAreas/add"}>
          {d.page["condominium/admin"].service_label_add_common_area}
        </Link>
      </Layout.Main>
    </Layout.Root>
  );
};

export default CondominiumAdminPage;
