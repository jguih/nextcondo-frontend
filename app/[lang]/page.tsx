import { Header } from "@/src/shared/components/header/header";
import { Layout } from "@/src/shared/components/layout/layout";
import { getDictionary } from "../../src/localization/dictionaries";
import { FC } from "react";
import { WithLocale } from "@/src/shared/types/with-locale";
import { authenticate } from "@/src/shared/authentication/server";
import { Typography } from "@/src/shared/components/typography/typography";
import styles from "./styles.module.scss";
import { Button } from "@/src/shared/components/button/button";

const Home: FC<WithLocale> = async ({ params: { lang } }) => {
  await authenticate();
  const d = await getDictionary(lang);

  return (
    <Layout.Root>
      <Layout.Header>
        <Header title={d.page.home.welcome} />
      </Layout.Header>
      <Layout.Main className={styles.main}>
        <Typography tag="p">{d.page.home.no_property_added}</Typography>
        <Button className={styles["add-condo-btn"]}>
          {d.page.home.add_property}
        </Button>
      </Layout.Main>
    </Layout.Root>
  );
};

export default Home;
