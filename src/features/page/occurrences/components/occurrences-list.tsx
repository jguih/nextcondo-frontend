"use client";

import { List } from "@/src/components/list/list";
import { FC } from "react";
import { OccurrencesListItem } from "./occurrences-list-item";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import { GetOccurrenceResponseDto } from "@/src/services/nextcondo/occurrences/schemas";

export const OccurrencesList: FC<{
  occurrenceList: GetOccurrenceResponseDto;
}> = ({ occurrenceList }) => {
  const lang = useLocale();

  return (
    <List>
      {occurrenceList.map((occurrence) => (
        <OccurrencesListItem
          key={occurrence.id}
          occurrence={occurrence}
          lang={lang}
        />
      ))}
    </List>
  );
};
