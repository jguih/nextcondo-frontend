import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { ListItem } from "@/src/components/list/items";
import { List } from "@/src/components/list/list";
import { Typography } from "@/src/components/typography/typography";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { getRelationshipType } from "@/src/features/page/tenants/components/tenantItem/get-relationship-type";
import { TenantItem } from "@/src/features/page/tenants/components/tenantItem/tenantItem";
import { TenantsService } from "@/src/services/nextcondo/tenants/server";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { WithLocale } from "@/src/types/with-locale";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FC, Fragment } from "react";

export const metadata: Metadata = {
  title: "NextCondo | Tenants",
};

const TenantsPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  const d = await getDictionary(lang);
  const result = await TenantsService.GetAsync();
  const tenants = result.success && result.hasData ? result.response.data : [];

  return (
    <Fragment>
      <Layout.Header>
        <Header
          title={d.page.tenants.title}
          actionButton={<GoBackButton path="/" />}
        />
      </Layout.Header>
      <Layout.Main>
        <List>
          {tenants.map((tenant, index) => (
            <ListItem key={`${tenant.id}-${index}`}>
              <TenantItem
                tenant={tenant}
                relationshipType={
                  <Typography>
                    {getRelationshipType(tenant.relationshipType, d)}
                  </Typography>
                }
              />
              <hr />
            </ListItem>
          ))}
        </List>
      </Layout.Main>
    </Fragment>
  );
};

export default TenantsPage;
