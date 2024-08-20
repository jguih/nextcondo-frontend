import type { Metadata, Viewport } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo",
  description: "Simple property management app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default RootLayout;
