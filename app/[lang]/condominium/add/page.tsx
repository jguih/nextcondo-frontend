import { FC } from "react";
import { Layout } from "@/src/components/layout/layout";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { AddCondominiumForm } from "@/src/features/page/condominium/add/components/form/server";
import { Toggler } from "@/src/features/page/condominium/add/components/toggler/toggler";

const CondominiumAddPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);

  return (
    <Layout.Main>
      <Toggler
        componentCreate={<AddCondominiumForm d={d} />}
        componentEnter={<>WIP</>}
        label={{
          create: d.button.create,
          enter: d.button.enter,
        }}
      />
    </Layout.Main>
  );
};

export default CondominiumAddPage;
