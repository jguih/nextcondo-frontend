"use client";

import { Typography } from "@/src/components/typography/typography";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import { format } from "@/src/features/localization/utils";
import { convertTimeFromUTCToUserTimezone } from "@/src/lib/utils/timezone/timezone-utils";
import { FC } from "react";

export const CommonAreaTime: FC<{
  text: string;
  startTime: string;
  endTime: string;
}> = ({ text, startTime, endTime }) => {
  const lang = useLocale();

  return (
    <Typography>
      {format(text, {
        time1: convertTimeFromUTCToUserTimezone(startTime, lang),
        time2: convertTimeFromUTCToUserTimezone(endTime, lang),
      })}
    </Typography>
  );
};
