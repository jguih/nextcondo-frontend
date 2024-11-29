import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import { Metadata } from "next";
import { Layout } from "@/src/components/layout/layout";

export const metadata: Metadata = {
  title: "NextCondo | Register",
};

const RegisterLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <Layout.Main className={styles.layout}>{children}</Layout.Main>;
};

export default RegisterLayout;
