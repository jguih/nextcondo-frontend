import { CircularProgress } from "@/src/shared/components/circularProgress/circular-progress";
import { FC } from "react";
import styles from "./styles.module.scss";

const HomeLoading: FC = () => {
  return (
    <div className={styles["loading-container"]}>
      <CircularProgress size="lg" />
    </div>
  );
};

export default HomeLoading;
