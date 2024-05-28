import { Box, BoxProps } from "@mui/joy";

const Header = (props: BoxProps) => {
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

const DrawerContent = (props: BoxProps) => {
  return <Box role="presentation" {...props} sx={{ p: 2, ...props.sx }} />;
};

const Layout = {
  Header,
  DrawerContent,
};

export default Layout;
