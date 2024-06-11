import { Box, BoxProps, Sheet, SheetProps } from "@mui/joy";
import { FC } from "react";

interface LayoutComponent {
  Header: FC<BoxProps>;
  DrawerContent: FC<SheetProps>;
  Root: FC<BoxProps>;
  Main: FC<BoxProps>;
}

const Header: LayoutComponent["Header"] = (props) => {
  return (
    <Box
      {...props}
      sx={{
        p: 1,
        gap: 2,
        bgcolor: "background.surface",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gridColumn: "1 / -1",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        ...props.sx,
      }}
    />
  );
};

const DrawerContent: LayoutComponent["DrawerContent"] = (props) => {
  return (
    <Sheet
      role="presentation"
      {...props}
      sx={{ p: 2, height: "100%", overflow: "auto", ...props.sx }}
    />
  );
};

const Root: LayoutComponent["Root"] = (props) => {
  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(64px, 200px) minmax(450px, 1fr)",
          md: "minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)",
        },
        gridTemplateRows: "54px 1fr",
        minHeight: "100vh",
        ...props.sx,
      }}
    />
  );
};

const Main: LayoutComponent["Main"] = (props) => {
  return (
    <Box
      {...props}
      sx={{
        p: 2,
        maxWidth: "100vw",
        ...props.sx,
      }}
    />
  );
};

const Layout: LayoutComponent = {
  Header,
  DrawerContent,
  Root,
  Main,
};

export { Layout };
