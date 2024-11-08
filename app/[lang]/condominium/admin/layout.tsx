import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Condominium Admin",
};

const CondominiumAdminLayout: FC<PropsWithChildren> = async ({ children }) => {
  return <>{children}</>;
};

export default CondominiumAdminLayout;
