import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeRegistry from "@/src/shared/theme-registry/theme-registry";
import Layout from "@/src/shared/components/layout";
import { Header } from "@/src/shared/components/header/header";
import { SidebarContent } from "@/src/shared/components/sidebar/sidebar.content";
import { Sidebar } from "@/src/shared/components/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Sidebar>
            <Layout.DrawerContent>
              <SidebarContent />
            </Layout.DrawerContent>
          </Sidebar>
          <Layout.Header>
            <Header />
          </Layout.Header>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
