import { LocaleProvider } from "@/src/features/localization/components/lang-provider";
import { GlobalServiceProvider } from "@/src/services/components/global-provider";
import { WithLocale } from "@/src/types/with-locale";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";
import { getNextCondoBackendPublicUrl } from "@/src/services/nextcondo/public/get-public-url";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";

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
  const nextcondoBackendUrl = await getNextCondoBackendPublicUrl();
  return (
    <html lang={lang} style={{ fontFamily: `${InterFont.style.fontFamily}` }}>
      <body>
        <LocaleProvider lang={lang}>
          <GlobalServiceProvider
            nextcondoBackendPublicUrl={nextcondoBackendUrl}
          >
            <AppSnackbarDispatcher />
            {children}
          </GlobalServiceProvider>
        </LocaleProvider>
      </body>
    </html>
  );
};

export default HomeLayout;
