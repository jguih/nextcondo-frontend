import "./globals.scss";
import type { Metadata, Viewport } from "next";
// import ThemeRegistry from "@/src/theme-registry/components/theme-registry";
import { AuthBoundary } from "@/src/shared/authentication/components/boundary";
import { Locale } from "@/i18n-config";
import { LocaleProvider } from "@/src/localization/client/LangProvider";
import { EnvProvider } from "@/src/shared/env/context";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "NextCondo",
  description: "Simple property management app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const InterFont = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}>) {
  return (
    <html
      lang={lang}
      data-theme="dark"
      style={{ fontFamily: `${InterFont.style.fontFamily}` }}
    >
      <body>
        {/* <ThemeRegistry> */}
        <LocaleProvider lang={lang}>
          <EnvProvider>
            <AuthBoundary>{children}</AuthBoundary>
          </EnvProvider>
        </LocaleProvider>
        {/* </ThemeRegistry> */}
      </body>
    </html>
  );
}
