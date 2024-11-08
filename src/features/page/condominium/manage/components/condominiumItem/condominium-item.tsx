import { Avatar } from "@/src/components/avatar/avatar";
import { Typography } from "@/src/components/typography/typography";
import { GetMineCondominiumResponse } from "@/src/services/nextcondo/condominium/schemas";
import { FC, Fragment } from "react";
import styles from "./styles.module.scss";
import { Dictionary } from "@/src/features/localization/types";
import { EnterCondominiumButton } from "../enter-condominium-button";

export const CondominiumItem: FC<{
  condominium: GetMineCondominiumResponse[number];
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
        <EnterCondominiumButton
          label={d.button.enter}
          disabled={disabled}
          condominiumId={condominium.id}
        />
      </div>
    </Fragment>
  );
};
