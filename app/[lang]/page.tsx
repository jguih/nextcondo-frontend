import { Header } from "@/src/shared/components/header/header";
import { Layout } from "@/src/shared/components/layout/layout";
import { getDictionary } from "../../src/localization/dictionaries";
import { FC } from "react";
import { WithLocale } from "@/src/shared/types/with-locale";
import { authenticate } from "@/src/shared/authentication/server";

const Home: FC<WithLocale> = async ({ params: { lang } }) => {
  await authenticate();
  const d = await getDictionary(lang);

  return (
    <Layout.Root>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main></Layout.Main>
    </Layout.Root>
  );
};

export default Home;
