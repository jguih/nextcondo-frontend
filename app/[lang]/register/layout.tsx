import { Box } from "@mui/joy";
import { FC, ReactNode } from "react";

const RegisterLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
};

export default RegisterLayout;
