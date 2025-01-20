import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { ListItem } from "@/src/components/list/items";
import { List } from "@/src/components/list/list";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import {
  BottomNavigationBookingHistory,
  BottomNavigationCommonAreas,
} from "@/src/features/page/commonAreas/components/bottom-navigation";
import { CommonAreaItem } from "@/src/features/page/commonAreas/components/commonAreaItem/common-area-item";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { WithLocale } from "@/src/types/with-locale";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Common Areas",
};

const CommonAreasPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  const result = await CommonAreasService.GetAsync();
  const commonAreaList =
    result.success && result.hasData ? result.response.data : [];

  return (
    <Layout.RootWithBottomNav>
      <Layout.Header>
        <Header
          title={d.page.commonAreas.title}
          actionButton={<GoBackButton path="/" />}
        />
      </Layout.Header>
      <Layout.Main>
        <List>
          {commonAreaList.map((area) => (
            <ListItem key={area.id}>
              <CommonAreaItem commonArea={area} lang={lang} />
              <hr />
            </ListItem>
          ))}
        </List>
      </Layout.Main>
      <Layout.BottomNavigation>
        <BottomNavigationCommonAreas
          label={d.bottom_nav.common_areas}
          selected
        />
        <BottomNavigationBookingHistory label={d.bottom_nav.booking_history} />
      </Layout.BottomNavigation>
    </Layout.RootWithBottomNav>
  );
};

export default CommonAreasPage;
