import { FC } from "react";
import styles from "./styles.module.scss";
import { CircularProgress } from "@/src/components/circularProgress/circular-progress";
import { Layout } from "@/src/components/layout/layout";
import { Header } from "@/src/components/header/header";

const HomeLoading: FC = async () => {
  return (
    <Layout.Root>
      <Layout.Header>
        <Header title={<CircularProgress />} />
      </Layout.Header>
      <Layout.Main className={styles["loading-container"]}>
        <CircularProgress size="lg" />
      </Layout.Main>
    </Layout.Root>
  );
};

export default HomeLoading;
