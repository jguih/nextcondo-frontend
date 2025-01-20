import { Locale } from "@/i18n-config";
import { ResourceDoesNotExist } from "@/src/components/error/resource-does-not-exist";
import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { getLocalizedAttribute } from "@/src/features/localization/utils";
import { CommonAreaBookingForm } from "@/src/features/page/commonAreas/[id]/booking/components/form/server";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { FC } from "react";

const CommonAreaBookingPage: FC<{
  params: {
    id?: string;
    lang: Locale;
  };
}> = async ({ params }) => {
  const d = await getDictionary(params.lang);
  const id = Number(params.id);

  if (!Number.isInteger(id)) {
    throw new Error("Common area id is not a number");
  }

  const result = await CommonAreasService.GetByIdAsync(id);
  const commonArea =
    result.success && result.hasData ? result.response.data : undefined;

  if (!commonArea) {
    return (
      <Layout.Root>
        <Layout.Header>
          <Header actionButton={<GoBackButton path="/commonAreas" />} />
        </Layout.Header>
        <Layout.Main>
          <ResourceDoesNotExist d={d} callbackPath="/commonAreas" />
        </Layout.Main>
      </Layout.Root>
    );
  }

  return (
    <Layout.Root>
      <Layout.Header>
        <Header
          actionButton={<GoBackButton path="/commonAreas" />}
          title={getLocalizedAttribute(commonArea.type, "name", params.lang)}
        />
      </Layout.Header>
      <Layout.Main>
        <CommonAreaBookingForm commonArea={commonArea} d={d} />
      </Layout.Main>
    </Layout.Root>
  );
};

export default CommonAreaBookingPage;
