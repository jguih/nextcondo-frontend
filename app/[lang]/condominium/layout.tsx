import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";
import { Layout } from "@/src/components/layout/layout";

export const metadata: Metadata = {
  title: "NextCondo | Condominium",
};

const CondominiumLayout: FC<PropsWithChildren> = async ({ children }) => {
  return <Layout.Root>{children}</Layout.Root>;
};

export default CondominiumLayout;
