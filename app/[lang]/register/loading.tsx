import { FC } from "react";
import { LoadingPage } from "@/src/components/loading/loading-page";
import { Layout } from "@/src/components/layout/layout";

const RegisterLoading: FC = async () => {
  return (
    <Layout.Main>
      <LoadingPage />
    </Layout.Main>
  );
};

export default RegisterLoading;
