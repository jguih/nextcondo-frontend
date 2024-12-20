import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { Link } from "@/src/components/link/link";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { FC } from "react";
import styles from "./styles.module.scss";
import { BuildingCommunity } from "@/src/components/icon/icons/building-community";
import { Typography } from "@/src/components/typography/typography";

const CondominiumAdminPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);

  return (
    <Layout.Root>
      <AppSnackbarDispatcher />
      <Layout.Header>
        <Header
          title={d.page["condominium/admin"].title}
          actionButton={<GoBackButton path="/" />}
        />
      </Layout.Header>
      <Layout.Main>
        <Typography tag="h4">{d.page.home.services}</Typography>
        <div className={styles["services-grid"]}>
          <Link
            href={"/condominium/admin/commonAreas"}
            variant="solid"
            orientation="vertical"
            color="primary"
          >
            {d.page["condominium/admin"].service_label_manage_common_areas}
            <BuildingCommunity size="xl" bold />
          </Link>
        </div>
      </Layout.Main>
    </Layout.Root>
  );
};

export default CondominiumAdminPage;
