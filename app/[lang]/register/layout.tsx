import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextCondo | Register",
};

const RegisterLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default RegisterLayout;
