import { MenuOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Tooltip, useColorScheme } from "@mui/joy";
import { useSidebar } from "../sidebar/store";
import { useState, useEffect } from "react";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

const MenuButton = () => {
  const openSidebar = useSidebar((state) => state.openSidebar);
  return (
    <IconButton size="sm" aria-label="open sidebar" onClick={openSidebar}>
      <MenuOutlined />
    </IconButton>
  );
};

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }

  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        onClick={() => {
          if (mode === "light") {
            setMode("dark");
          } else {
            setMode("light");
          }
        }}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
};

const AvatarButton = () => {
  return <Avatar size="sm" />;
};

const HeaderComponents = {
  MenuButton,
  ColorSchemeToggle,
  AvatarButton,
};

export default HeaderComponents;
