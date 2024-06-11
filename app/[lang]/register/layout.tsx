import { Box } from "@mui/joy";
import { FC, ReactNode } from "react";

const RegisterLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <Box sx={{ p: 2 }}>{children}</Box>;
};

export default RegisterLayout;
