import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { Link } from "@/src/components/link/link";
import { ListItem } from "@/src/components/list/items";
import { List } from "@/src/components/list/list";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { CommonAreaItem } from "@/src/features/page/commonAreas/components/commonAreaItem/common-area-item";
import { AddCommonAreaButton } from "@/src/features/page/condominium/admin/commonArea/components/add-common-area-button";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { WithLocale } from "@/src/types/with-locale";
import { FC, Fragment } from "react";

const CondominiumAdminCommonAreasPage: FC<WithLocale> = async ({
  params: { lang },
}) => {
  const d = await getDictionary(lang);
  const result = await CommonAreasService.GetAsync();
  const commonAreas =
    result.success && result.hasData ? result.response.data : [];

  return (
    <Layout.Root>
      <Layout.Header>
        <Header
          title={d.page["condominium/admin/commonAreas"].title}
          actionButton={<GoBackButton path="/condominium/admin" />}
        />
      </Layout.Header>
      <Layout.Main>
        <List>
          {commonAreas.map((area) => (
            <ListItem key={area.id}>
              <CommonAreaItem
                commonArea={area}
                lang={lang}
                actions={
                  <Fragment>
                    <Link
                      href={`/condominium/admin/commonAreas/${area.id}/edit`}
                      variant="solid"
                      color="primary"
                    >
                      {d.button.edit}
                    </Link>
                  </Fragment>
                }
              />
              <hr />
            </ListItem>
          ))}
        </List>
      </Layout.Main>
      <AddCommonAreaButton />
    </Layout.Root>
  );
};

export default CondominiumAdminCommonAreasPage;
