import { FC } from "react";
import styles from "./styles.module.scss";
import { CircularProgress } from "@/src/components/circularProgress/circular-progress";
import { Layout } from "@/src/components/layout/layout";
import { Header } from "@/src/components/header/header";

const CondominiumAddLoading: FC = async () => {
  return (
    <Layout.Root>
      <Layout.Header>
        <Header title={<CircularProgress size="sm" />} />
      </Layout.Header>
      <div className={styles["loading-container"]}>
        <CircularProgress size="lg" />
      </div>
    </Layout.Root>
  );
};

export default CondominiumAddLoading;
