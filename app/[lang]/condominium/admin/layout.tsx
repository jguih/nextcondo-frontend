import { Unauthorized } from "@/src/components/error/unauthorized";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { WithLocale } from "@/src/types/with-locale";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Condominium Admin",
};

const CondominiumAdminLayout: FC<PropsWithChildren<WithLocale>> = async ({
  children,
  params: { lang },
}) => {
  const isAuthorized =
    await UsersService.IsOwnerOrManagerOfCurrentCondomominium();
  if (!isAuthorized) {
    return <Unauthorized lang={lang} />;
  }
  return <>{children}</>;
};

export default CondominiumAdminLayout;
