import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { ListItem } from "@/src/components/list/items";
import { List } from "@/src/components/list/list";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { CondominiumItem } from "@/src/features/page/condominium/manage/components/condominiumItem/condominium-item";
import { CondominiumService } from "@/src/services/nextcondo/condominium/server";
import { WithLocale } from "@/src/types/with-locale";
import { FC } from "react";

const CondominiumManagePage: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  const result = await CondominiumService.GetMineAsync();
  const myCondominiums =
    result.success && result.hasData ? result.response.data : [];
  const currentCondominiumResult =
    await CondominiumService.GetMineCurrentAsync();
  const currentCondominium = currentCondominiumResult.success
    ? currentCondominiumResult.response.data
    : undefined;

  if (!currentCondominium) {
    return;
  }

  return (
    <Layout.RootWithBottomNav>
      <AppSnackbarDispatcher />
      <Layout.Header>
        <Header title={lang} actionButton={<GoBackButton path="/" />} />
      </Layout.Header>
      <Layout.Main>
        <List>
          {myCondominiums.map((myCondominium) => (
            <ListItem key={myCondominium.id}>
              <CondominiumItem
                condominium={myCondominium}
                disabled={myCondominium.id === currentCondominium.id}
                d={d}
              />
              <hr />
            </ListItem>
          ))}
        </List>
      </Layout.Main>
      <Layout.BottomNavigation></Layout.BottomNavigation>
    </Layout.RootWithBottomNav>
  );
};

export default CondominiumManagePage;
