import { Box, BoxProps } from "@mui/joy";
import { FC } from "react";

interface LayoutComponent {
  Header: FC<BoxProps>;
  DrawerContent: FC<BoxProps>;
}

const Header: LayoutComponent["Header"] = (props) => {
  return (
    <Box
      {...props}
      sx={{
        p: 2,
        gap: 2,
        bgcolor: "background.surface",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gridColumn: "1 / -1",
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
  return <Box role="presentation" {...props} sx={{ p: 2, ...props.sx }} />;
};

const Layout: LayoutComponent = {
  Header,
  DrawerContent,
};

export { Layout };
