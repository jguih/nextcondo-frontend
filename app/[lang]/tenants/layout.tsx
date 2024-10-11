import { FC, PropsWithChildren } from "react";
import { Layout } from "@/src/components/layout/layout";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";

const TenantsLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <Layout.Root>
      <AppSnackbarDispatcher />
      {children}
    </Layout.Root>
  );
};

export default TenantsLayout;
