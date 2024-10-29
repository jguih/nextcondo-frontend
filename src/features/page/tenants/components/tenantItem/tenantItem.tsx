import { Avatar } from "@/src/components/avatar/avatar";
import { GetTenantsResponseDto } from "@/src/services/nextcondo/tenants/schemas";
import { FC, ReactElement } from "react";
import styles from "./styles.module.scss";
import { Typography } from "@/src/components/typography/typography";
import { Chip } from "@/src/components/chip/chip";

export const TenantItem: FC<{
  tenant: GetTenantsResponseDto[number];
  relationshipType: ReactElement | ReactElement[];
}> = ({ tenant, relationshipType }) => {
  return (
    <div className={styles.item}>
      <Avatar name={tenant.fullName} />
      <div className={styles.details}>
        <Typography bold>{tenant.fullName}</Typography>
        <Typography>{tenant.email}</Typography>
        {tenant.phone && <Typography tag="small">{tenant.phone}</Typography>}
        <Chip className={styles.relationship}>{relationshipType}</Chip>
      </div>
    </div>
  );
};
