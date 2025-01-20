"use client";

import { Button } from "@/src/components/button/button";
import { CopyPlus } from "@/src/components/icon/icons/copy-plus";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { FC, MouseEventHandler } from "react";

export const CopyIdButton: FC<{ condominiumId: string }> = ({
  condominiumId,
}) => {
  const snackbar = useAppSnackbar((state) => state.dispatch);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(condominiumId);
    snackbar("text copied to clipboard", "success");
  };

  return (
    <Button
      variant="light"
      color="neutral"
      style={{ display: "inline" }}
      onClick={handleOnClick}
    >
      <CopyPlus />
    </Button>
  );
};
