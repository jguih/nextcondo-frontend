import { FC } from "react";
import { CircularProgress } from "@/src/components/circularProgress/circular-progress";
import { Layout } from "@/src/components/layout/layout";
import { Header } from "@/src/components/header/header";
import { LoadingPage } from "@/src/components/loading/loading-page";

const HomeLoading: FC = async () => {
  return (
    <Layout.Root>
      <Layout.Header>
        <Header title={<CircularProgress />} />
      </Layout.Header>
      <Layout.Main>
        <LoadingPage />
      </Layout.Main>
    </Layout.Root>
  );
};

export default HomeLoading;
