"use client";
import { Button, ButtonProps } from "@mui/joy";
import { FC } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps {}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return <Button type="submit" loading={pending} {...props} />;
};
