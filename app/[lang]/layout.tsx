import type { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo",
};

const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default HomeLayout;
