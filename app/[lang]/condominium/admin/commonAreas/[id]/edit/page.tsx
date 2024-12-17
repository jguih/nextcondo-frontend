import { Locale } from "@/i18n-config";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { EditCommonAreaForm } from "@/src/features/page/condominium/admin/commonArea/edit/components/form/server";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { FC } from "react";

const CondominiumAdminCommonAreasEditPage: FC<{
  params: { lang: Locale; id?: string };
}> = async ({ params: { lang, id } }) => {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId)) {
    throw new Error("Invalid ID, it must be a number.");
  }

  const result = await CommonAreasService.GetByIdAsync(parsedId);
  const commonArea =
    result.success && result.hasData ? result.response.data : undefined;

  if (!commonArea) {
    throw new Error(`Common area with id ${parsedId} not found`);
  }

  const d = await getDictionary(lang);

  return (
    <Layout.Main>
      <EditCommonAreaForm d={d} commonArea={commonArea} />
    </Layout.Main>
  );
};

export default CondominiumAdminCommonAreasEditPage;
