"use client";
import { Button, ButtonProps } from "@mui/joy";
import { FC, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps {}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const [mounted, setMounted] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button type="submit" disabled={!mounted} loading={pending} {...props} />
  );
};
