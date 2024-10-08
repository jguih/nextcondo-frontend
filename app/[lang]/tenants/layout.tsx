import { FC, PropsWithChildren } from "react";
import { Layout } from "@/src/components/layout/layout";

const TenantsLayout: FC<PropsWithChildren> = async ({ children }) => {
  return <Layout.Root>{children}</Layout.Root>;
};

export default TenantsLayout;
