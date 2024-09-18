import { FC, Fragment } from "react";
import { Layout } from "@/src/components/layout/layout";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { redirect } from "next/navigation";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { WithLocale } from "@/src/types/with-locale";
import { Form } from "@/src/features/page/condominiumAdd/components/form/server";

const CondominiumAddPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const d = await getDictionary(lang);

  return (
    <Fragment>
      <Layout.Main>
        <Form d={d} />
      </Layout.Main>
    </Fragment>
  );
};

export default CondominiumAddPage;
