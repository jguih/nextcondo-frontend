import {
  SectionsList,
  OccurrencesSection,
  ResidentsSection,
} from "@/src/page/home/components/card-list";
import { authenticate } from "@/src/shared/authentication/server";
import { Header } from "@/src/shared/components/header/header";
import { Layout } from "@/src/shared/components/layout";
import { SideDrawerProvider } from "@/src/shared/components/sideDrawer/context";
import {
  SideDrawer,
  SideDrawerContent,
} from "@/src/shared/components/sideDrawer/side-drawer";
import { Breadcrumbs, Typography } from "@mui/joy";
import { getDictionary } from "../../src/localization/dictionaries";
import { FC } from "react";
import { WithLocale } from "@/src/shared/types/with-locale";
import { getLabels } from "@/src/shared/components/sideDrawer/get-labels";
import { createClient } from "@/src/shared/authentication/supabase/server";

const Home: FC<WithLocale> = async ({ params: { lang } }) => {
  const { data } = await authenticate();
  const d = await getDictionary(lang);

  const supabase = createClient();
  const token = (await supabase.auth.getSession()).data.session?.access_token;

  if (!token) return;

  try {
    const response = await fetch(`${process.env.NEXTCONDO_API}/Users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const users = await response.json();

    console.log(users);
  } catch (error) {
    console.log(error);
  }

  return (
    <SideDrawerProvider>
      <Layout.Root>
        <SideDrawer>
          <Layout.DrawerContent>
            <SideDrawerContent user={data.user} label={getLabels(d)} />
          </Layout.DrawerContent>
        </SideDrawer>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <div></div>
        <Layout.Main>
          <Breadcrumbs aria-label="breadcrumbs" sx={{ p: 0, marginBottom: 2 }}>
            <Typography>{d.page.home.title}</Typography>
          </Breadcrumbs>
          <SectionsList>
            <ResidentsSection />
            <OccurrencesSection />
          </SectionsList>
        </Layout.Main>
      </Layout.Root>
    </SideDrawerProvider>
  );
};

export default Home;
