import styles from "./styles.module.scss";
import { CircularProgress } from "@/src/components/circularProgress/circular-progress";
import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { FC } from "react";

const CommonAreasLoading: FC = async () => {
  return (
    <Layout.Root>
      <Layout.Header>
        <Header
          title={<CircularProgress />}
          actionButton={<GoBackButton disabled />}
        />
      </Layout.Header>
      <Layout.Main className={styles["loading-container"]}>
        <CircularProgress size="lg" />
      </Layout.Main>
    </Layout.Root>
  );
};

export default CommonAreasLoading;
