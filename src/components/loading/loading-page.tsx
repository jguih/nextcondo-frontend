import { FC } from "react";
import styles from "./styles.module.scss";
import { CircularProgress } from "../circularProgress/circular-progress";

export const LoadingPage: FC = () => {
  return (
    <div className={styles.container}>
      <CircularProgress size="lg" />
    </div>
  );
};
