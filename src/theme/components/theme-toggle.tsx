"use client";
import { Button } from "@/src/shared/components/button/button";
import { MoonFilled } from "@/src/shared/components/icon/icons/moon-filled";
import { SunHigh } from "@/src/shared/components/icon/icons/sun-high";
import { FC, useEffect, useState } from "react";

export const ThemeToggle: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const getHtmlTag = () => {
    const htmlList = document.getElementsByTagName("html");
    if (htmlList.length === 1) {
      return htmlList.item(0);
    }
  };

  const toggleTheme = () => {
    const html = getHtmlTag();
    if (theme === "light" && html) {
      html.setAttribute("data-theme", "dark");
      setTheme("dark");
    } else if (theme === "dark" && html) {
      html.setAttribute("data-theme", "light");
      setTheme("light");
    }
  };

  useEffect(() => {
    setMounted(true);

    const html = getHtmlTag();
    const currentTheme = html?.getAttribute("data-theme");
    if (currentTheme === "light") setTheme("light");
    else if (currentTheme === "dark") setTheme("dark");
  }, []);

  return (
    <Button
      color="primary"
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
