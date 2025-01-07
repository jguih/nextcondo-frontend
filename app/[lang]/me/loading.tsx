import { Layout } from "@/src/components/layout/layout";
import { LoadingPage } from "@/src/components/loading/loading-page";
import { FC } from "react";

const MeLoading: FC = async () => {
  return (
    <Layout.Main>
      <LoadingPage />
    </Layout.Main>
  );
};

export default MeLoading;
