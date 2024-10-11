import { Avatar } from "@/src/components/avatar/avatar";
import { GetTenantsResponseDto } from "@/src/services/nextcondo/tenants/schemas";
import { FC } from "react";
import styles from "./styles.module.scss";
import { Typography } from "@/src/components/typography/typography";
import { Chip } from "@/src/components/chip/chip";

export const TenantItem: FC<{ tenant: GetTenantsResponseDto[number] }> = ({
  tenant,
}) => {
  return (
    <div className={styles.item}>
      <Avatar name={tenant.fullName} />
      <div className={styles.details}>
        <Typography>{tenant.fullName}</Typography>
        <Typography tag="small">{tenant.email}</Typography>
        {tenant.phone && <Typography tag="small">{tenant.phone}</Typography>}
        <Chip className={styles.relationship}>
          <Typography tag="small">{tenant.relationshipType}</Typography>
        </Chip>
      </div>
    </div>
  );
};
