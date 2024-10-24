import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { Link } from "@/src/components/link/link";
import { ListItem } from "@/src/components/list/items";
import { List } from "@/src/components/list/list";
import { Typography } from "@/src/components/typography/typography";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import {
  format,
  getLocalizedAttribute,
} from "@/src/features/localization/utils";
import { CommonAreaItem } from "@/src/features/page/commonAreas/components/commonAreaItem/common-area-item";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { WithLocale } from "@/src/types/with-locale";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FC, Fragment } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Common Areas",
};

const CommonAreasPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const d = await getDictionary(lang);
  const result = await CommonAreasService.GetAsync();
  const commonAreaList =
    result.success && result.hasData ? result.response.data : [];

  return (
    <Fragment>
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
              <CommonAreaItem
                action={
                  <Link href={"/"} variant="solid" color="primary">
                    {d.page.commonAreas.action_book}
                  </Link>
                }
              >
                <Typography tag="h5" color="primary" bold>
                  {getLocalizedAttribute(area.type, "name", lang)}
                </Typography>
                <Typography tag="small">
                  {format(d.page.commonAreas.time_from_to, {
                    time1: area.startTime,
                    time2: area.endTime,
                  })}
                </Typography>
                <Typography tag="small" muted>
                  {area.slots.length > 1
                    ? format(d.page.commonAreas.available_facility_plural, {
                        count: area.slots.length,
                      })
                    : format(d.page.commonAreas.available_facility, {
                        count: area.slots.length,
                      })}
                </Typography>
              </CommonAreaItem>
              <hr />
            </ListItem>
          ))}
        </List>
      </Layout.Main>
    </Fragment>
  );
};

export default CommonAreasPage;
