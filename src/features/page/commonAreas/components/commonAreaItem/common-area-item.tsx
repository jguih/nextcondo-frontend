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
import { getLocalTime } from "../../get-local-time";
import Image from "next/image";

export const CommonAreaItem: FC<{
  commonArea: GetCommonAreasResponseDto[number];
  lang: Locale;
}> = async ({ commonArea, lang }) => {
  const d = await getDictionary(lang);
  return (
    <div>
      <div className={styles.item}>
        <Image
          src="/placeholder/gym.jpg"
          height={96}
          width={96}
          alt="Placeholder Image"
        />
        <div className={styles.details}>
          <Typography tag="h5" color="primary" bold>
            {getLocalizedAttribute(commonArea.type, "name", lang)}
          </Typography>
          <Typography>
            {format(d.page.commonAreas.time_from_to, {
              time1: getLocalTime(commonArea.startTime),
              time2: getLocalTime(commonArea.endTime),
            })}
          </Typography>
          <Typography tag="small" muted>
            {commonArea.slots.length > 1
              ? format(d.page.commonAreas.available_facility_plural, {
                  count: commonArea.slots.length,
                })
              : format(d.page.commonAreas.available_facility, {
                  count: commonArea.slots.length,
                })}
          </Typography>
        </div>
      </div>
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
  );
};
