import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { UsersService } from "@/src/services/nextcondo/users/server";

export const metadata: Metadata = {
  title: "NextCondo | Condominium",
};

const CondominiumLayout: FC<PropsWithChildren> = async ({ children }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  return <>{children}</>;
};

export default CondominiumLayout;
