import { FC } from "react";
import { Layout } from "@/src/components/layout/layout";
import { LoadingPage } from "@/src/components/loading/loading-page";

const CondominiumManageLoading: FC = async () => {
  return (
    <Layout.Main>
      <LoadingPage />
    </Layout.Main>
  );
};

export default CondominiumManageLoading;
