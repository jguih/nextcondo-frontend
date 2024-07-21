import { Box, BoxProps } from "@mui/joy";
import { FC } from "react";

const Form: FC<BoxProps<"form">> = (props) => {
  return (
    <Box
      component={"form"}
      {...props}
      sx={[
        { display: "flex", flexDirection: "column", gap: 2, mt: 4 },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
};

export const Layout = { Form };
