"use client";
import { Button } from "@/src/shared/components/button/button";
import { SunHigh } from "@/src/shared/components/icon/sun-high";
import { FC } from "react";

export const ThemeToggle: FC = () => {
  return (
    <Button variant="transparent">
      <SunHigh color="inherit" />
    </Button>
  );
};
