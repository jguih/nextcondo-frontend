import "../globals.scss";
import { LocaleProvider } from "@/src/localization/client/LangProvider";
import { GlobalServiceProvider } from "@/src/services/global-provider";
import { EnvProvider } from "@/src/shared/env/context";
import { WithLocale } from "@/src/shared/types/with-locale";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Home",
};

const InterFont = Inter({ subsets: ["latin"] });

const HomeLayout: FC<PropsWithChildren<WithLocale>> = ({
  children,
  params: { lang },
}) => {
  return (
    <html
      lang={lang}
      data-theme="light"
      style={{ fontFamily: `${InterFont.style.fontFamily}` }}
    >
      <body>
        <LocaleProvider lang={lang}>
          <EnvProvider>
            <GlobalServiceProvider>{children}</GlobalServiceProvider>
          </EnvProvider>
        </LocaleProvider>
      </body>
    </html>
  );
};

export default HomeLayout;
