"use client";

import { Box } from "@mui/joy";
import { ReactNode, Dispatch, useState, Fragment } from "react";

type TogglerProps = {
  defaultExpanded?: boolean;
  children: ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
  }) => ReactNode;
};

export const Toggler = ({
  defaultExpanded = false,
  renderToggle,
  children,
}: TogglerProps) => {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </Fragment>
  );
};
