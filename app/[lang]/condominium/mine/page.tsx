import { Layout } from "@/src/components/layout/layout";
import { ListItem } from "@/src/components/list/items";
import { List } from "@/src/components/list/list";
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

  return (
    <Layout.Main>
      {currentCondominium && myCondominiums.length > 0 && (
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
      )}
    </Layout.Main>
  );
};

export default CondominiumManagePage;
