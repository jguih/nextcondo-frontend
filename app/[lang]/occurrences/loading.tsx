import styles from "./styles.module.scss";
import { CircularProgress } from "@/src/components/circularProgress/circular-progress";
import { FC } from "react";

const OccurrencesLoading: FC = async () => {
  return (
    <div className={styles["loading-container"]}>
      <CircularProgress size="lg" />
    </div>
  );
};

export default OccurrencesLoading;
