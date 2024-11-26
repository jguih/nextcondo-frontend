import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { FC } from "react";
import { Typography } from "../typography/typography";
import { Layout } from "../layout/layout";
import { Header } from "../header/header";
import { GoBackButton } from "../header/go-back-button";

export const Unauthorized: FC<{ lang: Locale }> = async ({ lang }) => {
  const d = await getDictionary(lang);

  return (
    <Layout.Root>
      <Layout.Header>
        <Header actionButton={<GoBackButton path="/" />} />
      </Layout.Header>
      <Layout.Main>
        <Typography tag="p" color="danger">
          {d.error.not_authorized_to_perform_action}
        </Typography>
      </Layout.Main>
    </Layout.Root>
  );
};
