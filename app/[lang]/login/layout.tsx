import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

const LoginLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default LoginLayout;
