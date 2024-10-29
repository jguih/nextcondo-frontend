import { FC, Fragment, PropsWithChildren } from "react";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { redirect } from "next/navigation";

const CommonAreasLayout: FC<PropsWithChildren> = async ({ children }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  return <Fragment>{children}</Fragment>;
};

export default CommonAreasLayout;
