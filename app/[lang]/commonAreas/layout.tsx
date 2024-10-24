import { FC, PropsWithChildren } from "react";
import { Layout } from "@/src/components/layout/layout";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { redirect } from "next/navigation";

const CommonAreasLayout: FC<PropsWithChildren> = async ({ children }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  return (
    <Layout.Root>
      <AppSnackbarDispatcher />
      {children}
    </Layout.Root>
  );
};

export default CommonAreasLayout;
