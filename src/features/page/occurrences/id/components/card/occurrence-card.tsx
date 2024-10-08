import styles from "./styles.module.scss";
import { Typography } from "@/src/components/typography/typography";
import { FC, Fragment } from "react";
import { getOccurrenceTypeName } from "../../../utils";
import { GetOccurrenceByIdResponseDto } from "@/src/services/nextcondo/occurrences/schemas";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/src/features/localization/types";
import {
  ActionDelete,
  ActionDeleteDialogActions,
} from "../actionDelete/action-delete";
import { ActionEdit } from "../action-edit";
import { DialogHeader } from "@/src/components/dialog/header";
import { DialogContent } from "@/src/components/dialog/content";
import { DialogActions } from "@/src/components/dialog/actions";

export const OccurrenceCard: FC<{
  occurrence: GetOccurrenceByIdResponseDto;
  lang: Locale;
  d: Dictionary;
}> = ({ occurrence, lang, d }) => {
  return (
    <div>
      <Typography tag="h4">{occurrence.title}</Typography>
      <hr></hr>
      <Typography>{occurrence.description}</Typography>
      <div className={styles.footer}>
        <Typography>
          {d.page["occurrences/[id]"].category}:{" "}
          <Typography tag="span" color="accent">
            {getOccurrenceTypeName(occurrence.occurrenceType, lang)}
          </Typography>
        </Typography>
        <Typography>
          {d.page["occurrences/[id]"].owned_by}:{" "}
          <Typography tag="span">{occurrence.creator.fullName}</Typography>
        </Typography>
      </div>
      <hr></hr>
      <div className={styles.actions}>
        <ActionDelete
          dialogBody={
            <Fragment>
              <DialogHeader>
                <Typography tag="h5" color="danger">
                  {d.page["occurrences/[id]"].modal_title_deleteOccurrence}
                </Typography>
              </DialogHeader>
              <DialogContent>
                <Typography>
                  {
                    d.page["occurrences/[id]"]
                      .modal_description_deleteOccurrence
                  }
                </Typography>
              </DialogContent>
              <DialogActions>
                <ActionDeleteDialogActions
                  label={{ close: d.button.close, delete: d.button.delete }}
                />
              </DialogActions>
            </Fragment>
          }
          label={d.button.delete}
          occurrenceId={occurrence.id}
        />
        <ActionEdit label={d.button.edit} occurrenceId={occurrence.id} />
      </div>
    </div>
  );
};
