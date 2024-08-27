"use client";
import { FC } from "react";
import { useThemeToggler } from "./useThemeToggler";
import { Button } from "@/src/components/button/button";
import { SunHigh } from "@/src/components/icon/icons/sun-high";
import { MoonFilled } from "@/src/components/icon/icons/moon-filled";

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme, mounted } = useThemeToggler();

  return (
    <Button
      color="neutral"
      variant="light"
      disabled={!mounted}
      onClick={() => toggleTheme()}
      aria-label={theme === "dark" ? "use light theme" : "use dark theme"}
    >
      {theme === "light" ? (
        <SunHigh />
      ) : theme === "dark" ? (
        <MoonFilled />
      ) : null}
    </Button>
  );
};
