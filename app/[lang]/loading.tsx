import { FC } from "react";
import styles from "./styles.module.scss";
import { CircularProgress } from "@/src/components/circularProgress/circular-progress";

const HomeLoading: FC = () => {
  return (
    <div className={styles["loading-container"]}>
      <CircularProgress size="lg" />
    </div>
  );
};

export default HomeLoading;
