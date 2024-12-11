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
          <Typography tag="h5" color="primary">
            {condominium.name}
          </Typography>
          {condominium.description && (
            <Fragment>
              <Typography>{condominium.description}</Typography>
              <br />
            </Fragment>
          )}
          <Typography muted>
            {d.common.tenant_plural}: {condominium.members.length}
          </Typography>
          <Typography muted>Id: {condominium.id}</Typography>
          <Typography muted>
            {d.common.owner}: {condominium.owner.fullName}
          </Typography>
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
