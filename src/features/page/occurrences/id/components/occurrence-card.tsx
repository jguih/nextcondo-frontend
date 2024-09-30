import styles from "./styles.module.scss";
import { Typography } from "@/src/components/typography/typography";
import { FC } from "react";
import { getOccurrenceTypeName } from "../../utils";
import { GetOccurrenceByIdResponseDto } from "@/src/services/nextcondo/occurrences/schemas";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/src/features/localization/types";
import { ActionDelete } from "./action-delete";
import { ActionEdit } from "./action-edit";

export const OccurrenceCard: FC<{
  occurrence: GetOccurrenceByIdResponseDto;
  lang: Locale;
  d: Dictionary;
}> = ({ occurrence, lang, d }) => {
  return (
    <div className={styles.card}>
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
          label={d.button.delete}
          dialog={{
            title: (
              <Typography tag="h5" color="danger">
                {d.page["occurrences/[id]"].modal_title_deleteOccurrence}
              </Typography>
            ),
            content: (
              <Typography>
                {d.page["occurrences/[id]"].modal_description_deleteOccurrence}
              </Typography>
            ),
            labelClose: d.button.close,
            labelDelete: d.button.delete,
          }}
          occurrenceId={occurrence.id}
        />
        <ActionEdit label={d.button.edit} />
      </div>
    </div>
  );
};
