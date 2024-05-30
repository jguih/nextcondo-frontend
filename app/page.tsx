import {
  SectionsList,
  OccurrencesSection,
  ResidentsSection,
} from "@/src/page/home/card-list";
import { Header } from "@/src/shared/components/header/header";
import { Layout } from "@/src/shared/components/layout";
import {
  SideDrawer,
  SideDrawerContent,
} from "@/src/shared/components/sidebar/side-drawer";
import { Breadcrumbs, Typography } from "@mui/joy";

const Home = () => {
  return (
    <Layout.Root>
      <SideDrawer>
        <Layout.DrawerContent>
          <SideDrawerContent />
        </Layout.DrawerContent>
      </SideDrawer>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <div></div>
      <Layout.Main>
        <Breadcrumbs aria-label="breadcrumbs" sx={{ p: 0, marginBottom: 2 }}>
          <Typography>Home</Typography>
        </Breadcrumbs>
        <SectionsList>
          <ResidentsSection />
          <OccurrencesSection />
        </SectionsList>
      </Layout.Main>
    </Layout.Root>
  );
};

export default Home;
