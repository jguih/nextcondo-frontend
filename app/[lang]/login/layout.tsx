import { Box } from "@mui/joy";
import { FC, ReactNode } from "react";

const LoginLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <Box sx={{ p: 2 }}>{children}</Box>;
};

export default LoginLayout;
