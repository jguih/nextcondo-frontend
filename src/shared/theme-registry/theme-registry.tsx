"use client";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import NextAppDirEmotionCacheProvider from "./emotion-cache";
import theme from "./theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "joy" }}>
      <CssVarsProvider theme={theme} defaultMode="system">
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
