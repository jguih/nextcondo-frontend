import styles from "./styles.module.scss";
import { ListItem } from "@/src/components/list/items";
import { Typography } from "@/src/components/typography/typography";
import { GetOccurrenceResponseDto } from "@/src/services/nextcondo/occurrences/schemas";
import { FC } from "react";
import { getOccurrenceTypeName } from "../utils";
import { Locale } from "@/i18n-config";
import Link from "next/link";

type OccurrencesListItemProps = {
  occurrence: GetOccurrenceResponseDto[number];
  lang: Locale;
};

export const OccurrencesListItem: FC<OccurrencesListItemProps> = ({
  occurrence,
  lang,
}) => {
  return (
    <ListItem>
      <Link
        href={`/occurrences/${occurrence.id}`}
        className={styles["occurrence-list-item-link"]}
      >
        <div className={styles["occurrence-list-item-header"]}>
          <Typography tag="h5" className={styles.title}>
            {occurrence.title}
          </Typography>
        </div>
        <Typography className={styles["occurrence-list-item-description"]}>
          {occurrence.description}
        </Typography>
        <Typography color="accent">
          {getOccurrenceTypeName(occurrence.occurrenceType, lang)}
        </Typography>
        <div className={styles["occurrence-list-item-footer"]}>
          <div></div>
          <Typography tag="small" muted>
            {occurrence.creator.fullName}
          </Typography>
        </div>
      </Link>
    </ListItem>
  );
};
