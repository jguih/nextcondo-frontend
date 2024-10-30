import { Avatar } from "@/src/components/avatar/avatar";
import { Typography } from "@/src/components/typography/typography";
import { GetCondominiumMine } from "@/src/services/nextcondo/condominium/schemas";
import { FC, Fragment } from "react";
import styles from "./styles.module.scss";
import { Dictionary } from "@/src/features/localization/types";
import { Button } from "@/src/components/button/button";
import { Link } from "@/src/components/link/link";

export const CondominiumItem: FC<{
  condominium: GetCondominiumMine[number];
  disabled: boolean;
  d: Dictionary;
}> = ({ condominium, disabled, d }) => {
  return (
    <Fragment>
      <div className={styles.item}>
        <div className={styles.details}>
          <Typography tag="h5">{condominium.name}</Typography>
          {condominium.description && (
            <Fragment>
              <Typography>{condominium.description}</Typography>
              <br />
            </Fragment>
          )}
          <Typography>
            {d.common.tenant_plural}: {condominium.members.length}
          </Typography>
        </div>
        <div className={styles.owner}>
          <Typography>{d.common.owner}:</Typography>
          <Avatar name={condominium.owner.fullName} size="sm" />
          <Typography>{condominium.owner.fullName}</Typography>
        </div>
      </div>
      <div className={styles.actions}>
        <Link href={"/condominium/manage"}>Ver Detalhes</Link>
        <Button disabled={disabled}>Entrar</Button>
      </div>
    </Fragment>
  );
};
