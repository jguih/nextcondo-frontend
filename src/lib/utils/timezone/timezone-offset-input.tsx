"use client";
import { FC } from "react";
import { getUserTimezoneOffsetMinutes } from "./timezone-utils";

export const UserTimezoneOffsetMinutesInput: FC = () => {
  return (
    <input
      id="timezone-offset-minutes"
      name="timezoneOffsetMinutes"
      defaultValue={getUserTimezoneOffsetMinutes()}
      hidden
    />
  );
};
