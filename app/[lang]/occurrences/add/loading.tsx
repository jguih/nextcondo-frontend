import styles from "./styles.module.scss";
import { CircularProgress } from "@/src/components/circularProgress/circular-progress";
import { Layout } from "@/src/components/layout/layout";
import { FC } from "react";

const LoadingOccurrencesAdd: FC = () => {
  return (
    <Layout.Main className={styles["loading-container"]}>
      <CircularProgress size="lg" />
    </Layout.Main>
  );
};

export default LoadingOccurrencesAdd;
