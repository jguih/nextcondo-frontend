import { FC } from "react";
import styles from "./styles.module.scss";
import { CircularProgress } from "@/src/components/circularProgress/circular-progress";
import { Layout } from "@/src/components/layout/layout";

const CondominiumAddLoading: FC = async () => {
  return (
    <Layout.Main className={styles["loading-container"]}>
      <CircularProgress size="lg" />
    </Layout.Main>
  );
};

export default CondominiumAddLoading;
