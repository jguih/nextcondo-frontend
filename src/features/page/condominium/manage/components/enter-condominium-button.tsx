"use client";
import { Button } from "@/src/components/button/button";
import { FC, MouseEventHandler } from "react";
import { ActionSetCurrentCondominiumAsync } from "../actions";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { useRouter } from "next/navigation";

export const EnterCondominiumButton: FC<{
  label: string;
  disabled: boolean;
  condominiumId: string;
}> = ({ label, disabled, condominiumId }) => {
  const snackbar = useAppSnackbar((state) => state.dispatch);
  const router = useRouter();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = async () => {
    const { result, message } =
      await ActionSetCurrentCondominiumAsync(condominiumId);
    if (result.success) {
      snackbar(message, "success");
      router.push("/");
    } else {
      snackbar(message, "error");
    }
  };

  return (
    <Button onClick={handleOnClick} disabled={disabled}>
      {label}
    </Button>
  );
};
