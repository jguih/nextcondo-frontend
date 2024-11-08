import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { AddCommonAreaForm } from "@/src/features/page/condominium/admin/commonArea/add/components/form/server";
import { WithLocale } from "@/src/types/with-locale";
import { FC } from "react";

const CondominiumAdminCommonAreasAddPage: FC<WithLocale> = async ({
  params: { lang },
}) => {
  const d = await getDictionary(lang);

  return (
    <Layout.Main>
      <AddCommonAreaForm d={d} />
    </Layout.Main>
  );
};

export default CondominiumAdminCommonAreasAddPage;
