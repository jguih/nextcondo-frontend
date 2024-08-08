"use client";
import { Button } from "@/src/shared/components/button/button";
import { MoonFilled } from "@/src/shared/components/icon/icons/moon-filled";
import { SunHigh } from "@/src/shared/components/icon/icons/sun-high";
import { FC } from "react";
import { useThemeToggler } from "./useThemeToggler";

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme, mounted } = useThemeToggler();

  return (
    <Button
      color="neutral"
      variant="light"
      disabled={!mounted}
      onClick={() => toggleTheme()}
    >
      {theme === "light" ? (
        <SunHigh />
      ) : theme === "dark" ? (
        <MoonFilled />
      ) : null}
    </Button>
  );
};
