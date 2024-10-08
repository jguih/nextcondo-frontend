import styles from "./styles.module.scss";
import { CircularProgress } from "@/src/components/circularProgress/circular-progress";
import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { FC, Fragment } from "react";

const TenantsLoading: FC = async () => {
  return (
    <Fragment>
      <Layout.Header>
        <Header
          title={<CircularProgress />}
          actionButton={<GoBackButton disabled />}
        />
      </Layout.Header>
      <Layout.Main className={styles["loading-container"]}>
        <CircularProgress size="lg" />
      </Layout.Main>
    </Fragment>
  );
};

export default TenantsLoading;
