import { FC, ReactElement } from "react";
import styles from "./styles.module.scss";

export const CommonAreaItem: FC<{
  action: ReactElement | ReactElement[];
  children: ReactElement | ReactElement[];
}> = ({ children, action }) => {
  return (
    <div>
      <div className={styles.item}>
        <img src="https://dummyimage.com/64x64" alt="Placeholder Image" />
        <div className={styles.details}>{children}</div>
        <div className={styles.actions}>{action}</div>
      </div>
    </div>
  );
};
