import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import {
  useColorScheme,
  IconButton,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
} from "@mui/joy";
import { FC, useState, useEffect } from "react";

interface ThemeToggleProps {
  label: string;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ label }) => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }

  return (
    <ListItemButton
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      <ListItemDecorator>
        {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
      </ListItemDecorator>
      <ListItemContent>{label}</ListItemContent>
    </ListItemButton>
  );
};
