"use client";

import { Button } from "@/src/components/button/button";
import { CopyPlus } from "@/src/components/icon/icons/copy-plus";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { FC, MouseEventHandler } from "react";

export const CopyIdButton: FC<{ condominiumId: string; message: string }> = ({
  condominiumId,
  message,
}) => {
  const snackbar = useAppSnackbar((state) => state.dispatch);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(condominiumId);
    snackbar(message, "success");
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
