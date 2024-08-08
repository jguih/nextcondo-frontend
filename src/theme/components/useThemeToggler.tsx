import { useEffect, useState } from "react";

type ThemeOptions = "light" | "dark";
const themes: string[] = ["light", "dark"];

export type UseThemeHandler = {
  mounted: boolean;
  theme: ThemeOptions;
  toggleTheme: () => void;
};

const getHtmlTag = () => {
  const htmlList = document.getElementsByTagName("html");
  if (htmlList.length === 1) {
    return htmlList.item(0);
  }
};

const isValidTheme = (value?: string | null): value is ThemeOptions => {
  if (!value) return false;
  return themes.includes(value);
};

export const useThemeToggler = (): UseThemeHandler => {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<ThemeOptions>("light");

  const setTheme = (theme: ThemeOptions) => {
    const html = getHtmlTag();
    if (!html) return;
    html.setAttribute("data-theme", theme);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  useEffect(() => {
    const html = getHtmlTag();

    if (!html) return;

    const current = html.getAttribute("data-theme");
    if (isValidTheme(current)) setThemeState(current);

    const mutation = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "data-theme" &&
          mutation.target instanceof HTMLHtmlElement
        ) {
          const value = mutation.target.getAttribute(mutation.attributeName);
          if (isValidTheme(value)) setThemeState(value);
        }
      });
    });

    mutation.observe(html, { attributes: true });
    setMounted(true);

    return () => mutation.disconnect();
  }, []);

  return {
    mounted,
    theme,
    toggleTheme,
  };
};
