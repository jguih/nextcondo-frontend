import "../globals.scss";
import { LocaleProvider } from "@/src/localization/client/LangProvider";
import { MSWProvider } from "@/src/mocks/components/msw-provider";
import { GlobalServiceProvider } from "@/src/services/global-provider";
import { EnvProvider } from "@/src/shared/env/context";
import { WithLocale } from "@/src/shared/types/with-locale";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";

if (
  process.env.NEXT_RUNTIME === "nodejs" &&
  process.env.NODE_ENV === "development"
) {
  console.log("SERVER LISTEN");

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { server } = require("../../src/mocks/nextjs/node");
  server.listen();

  Reflect.set(fetch, "__FOO", "YES");
}

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
            <GlobalServiceProvider>
              <MSWProvider>{children}</MSWProvider>
            </GlobalServiceProvider>
          </EnvProvider>
        </LocaleProvider>
      </body>
    </html>
  );
};

export default HomeLayout;
