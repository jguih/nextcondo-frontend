"use client";
import { Locale } from "@/i18n-config";
import { createContext, FC, PropsWithChildren, useContext } from "react";

const LocaleContext = createContext<Locale>("pt-BR");

export const LocaleProvider: FC<PropsWithChildren<{ lang: Locale }>> = ({
  children,
  lang,
}) => {
  return (
    <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  return context;
};
