import { FC, ReactNode } from "react";
import { Metadata } from "next";
import { Layout } from "@/src/components/layout/layout";

export const metadata: Metadata = {
  title: "NextCondo | Login",
};

const LoginLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <Layout.Main>{children}</Layout.Main>;
};

export default LoginLayout;
