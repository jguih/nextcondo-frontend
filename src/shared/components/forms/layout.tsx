import { Box, BoxProps } from "@mui/joy";
import { FC } from "react";

const FormContent: FC<BoxProps> = (props) => {
  return (
    <Box
      {...props}
      sx={[
        { display: "flex", flexDirection: "column", gap: 2, mt: 4 },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
};

export const Layout = { FormContent };
