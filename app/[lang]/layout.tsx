import { EnvProvider } from "@/src/components/env/context";
import { getEnv } from "@/src/components/env/get-env.action";
import { LocaleProvider } from "@/src/features/localization/components/lang-provider";
import { GlobalServiceProvider } from "@/src/services/components/global-provider";
import "../globals.scss";
import { WithLocale } from "@/src/types/with-locale";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo",
  description: "Simple property management app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const InterFont = Inter({ subsets: ["latin"] });

const HomeLayout: FC<PropsWithChildren<WithLocale>> = async ({
  children,
  params: { lang },
}) => {
  const env = await getEnv();

  return (
    <html
      lang={lang}
      data-theme="light"
      style={{ fontFamily: `${InterFont.style.fontFamily}` }}
    >
      <body>
        <LocaleProvider lang={lang}>
          <EnvProvider env={env}>
            <GlobalServiceProvider>{children}</GlobalServiceProvider>
          </EnvProvider>
        </LocaleProvider>
      </body>
    </html>
  );
};

export default HomeLayout;
