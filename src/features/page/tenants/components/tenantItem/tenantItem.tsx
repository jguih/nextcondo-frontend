import { Typography } from "@/src/components/typography/typography";
import { GetTenantsResponseDto } from "@/src/services/nextcondo/tenants/schemas";
import { FC, Fragment } from "react";

export const TenantItem: FC<{ tenant: GetTenantsResponseDto[number] }> = ({
  tenant,
}) => {
  return (
    <Fragment>
      <Typography>{tenant.fullName}</Typography>
    </Fragment>
  );
};
