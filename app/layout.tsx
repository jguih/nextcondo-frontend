import type { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo",
  description: "Simple property management app",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default RootLayout;
