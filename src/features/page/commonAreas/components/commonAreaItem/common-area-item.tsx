import { FC } from "react";
import styles from "./styles.module.scss";
import { Typography } from "@/src/components/typography/typography";
import {
  format,
  getLocalizedAttribute,
} from "@/src/features/localization/utils";
import { GetCommonAreasResponseDto } from "@/src/services/nextcondo/commonAreas/schemas";
import { Link } from "@/src/components/link/link";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import Image from "next/image";
import { CommonAreaTime } from "./common-area-time";

export const CommonAreaItem: FC<{
  commonArea: GetCommonAreasResponseDto[number];
  lang: Locale;
}> = async ({ commonArea, lang }) => {
  const d = await getDictionary(lang);
  const commonAreaTypeName = getLocalizedAttribute(
    commonArea.type,
    "name",
    lang
  );
  return (
    <div>
      <div className={styles.item}>
        {commonArea.coverImageURL ? (
          <Image
            src={commonArea.coverImageURL}
            height={132}
            width={112}
            alt={`cover image for ${commonAreaTypeName}`}
            unoptimized
            priority
          />
        ) : (
          <div className={styles.placeholder}>
            <Typography muted>
              {commonAreaTypeName.slice(0, 2).toUpperCase()}
            </Typography>
          </div>
        )}
        <div className={styles.details}>
          <Typography tag="h5" color="primary" bold>
            {commonAreaTypeName}
          </Typography>
          <CommonAreaTime
            text={d.page.commonAreas.time_from_to}
            startTime={commonArea.startTime}
            endTime={commonArea.endTime}
          />
          <Typography tag="small" muted>
            {commonArea.slots.length > 1
              ? format(d.page.commonAreas.available_facility_plural, {
                  count: commonArea.slots.length,
                })
              : format(d.page.commonAreas.available_facility, {
                  count: commonArea.slots.length,
                })}
          </Typography>
          <div className={styles.actions}>
            <Link
              href={`/commonAreas/${commonArea.id}/booking`}
              variant="solid"
              color="primary"
            >
              {d.page.commonAreas.action_book}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
