import "../globals.scss";
import { LocaleProvider } from "@/src/localization/client/LangProvider";
import { GlobalServiceProvider } from "@/src/services/global-provider";
import { EnvProvider } from "@/src/shared/env/context";
import { getEnv } from "@/src/shared/env/get-env.action";
import { WithLocale } from "@/src/shared/types/with-locale";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Home",
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
